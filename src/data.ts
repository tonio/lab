import { parse } from 'csv-parse/browser/esm/sync'

import { writable, derived } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'

export const CAT = "Catégorie"
export const ROOM = "Salle"
export const NAME = "Nom"
export const PL = "Placard"
export const NB = "Quantité"
export const OO = "Rebut"
export const CM = "Remarques"

const MAX = 40

// Base stores
const items = writable([])
const search = writable('')
const loading = writable(false)
const error = writable(false)
export const STORES: Record<string, Writable<any>|Readable<any>> = {
  items,
  search,
  loading,
  error,
  results: derived(
    [items, search],
    ([items, search]) => (search == '') ? [] : match(search, items, MAX)
  ),
  categories: derived(items, items => extract(items, CAT)),
  rooms: derived(items, items => extract(items, ROOM))
}

const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQR5DfQy_hzpZXaQAhbUp5XkjeIVnMzyNP-pKLl8s6dUlAfWO-aM9Rsb68owsADh9IxyR2ja96FZ6R9/pub?gid=0&single=true&output=csv"

export async function load() {
  loading.set(true)
  error.set(false)
  try {
    const response = await fetch(sheetUrl).then(r => r.text())
    items.set(csvMapper(response))
  } catch(e) {
    error.set(e)
  }
  loading.set(false)
}

export function csvMapper(response: string) {
  return parse(response, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  })
    .map(searchable)
    .sort((a: any, b: any) => a[NAME].localeCompare(b[NAME]))
}

export function extract(items: any[], key: string): string[] {
  return [
    ...new Set(items.map(i => i[key].trim()))
  ].sort(
    (a, b) => a.toString().localeCompare(b.toString())
  ).filter(Boolean)
}

export function match(query: string, items: any[], max: number) {
  const searches: Record<string, string>[] = []
  query.trim().split(' ').forEach(search => {
    let key = "Nom"
    if (search.indexOf(":") > 0) {
      ;[key, search] = search.split(":")
    }
    if (key === "Nom") {
      key = "debured"
      search = clean(search)
    }
    searches.push({ key, search })
  })
  return items
    .filter(
      item => searches.every(
        ({key, search}) => item[key].toString().indexOf(search) !== -1
      )
    )
    .splice(0, max)
}

const searchable = (s: string) => {
  // Uppercase first letter
  s[NAME] = s[NAME].charAt(0).toUpperCase() + s[NAME].slice(1)

  // store debured name
  s['debured'] = clean(s[NAME])
  return s
}

const clean = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, "").toLowerCase()
