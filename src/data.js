import CSV from "csv.js"

export const CAT = "Catégorie"
export const ROOM = "Salle"
export const SLUGS = {
  [CAT]: "cat",
  [ROOM]: "room"
}

const url =
  "https://docs.google.com/spreadsheets/d/e/" +
  "2PACX-1vQR5DfQy_hzpZXaQAhbUp5XkjeIVnMzyNP-pKLl8s6dUlAfWO-aM9Rsb68owsADh9IxyR2ja96FZ6R9" +
  "/pub?output=csv"

export async function loadData() {
  return fetch(url)
    .then(r => r.text())
    .then(data => CSV.decode(data))
    .then(items => items.sort((a, b) => a.Nom.localeCompare(b.Nom)))
}

export function extract(items, key) {
  return [...new Set(items.map(i => i[key]))]
}

export function match(search, items, max) {
  let key = "Nom"
  if (search.indexOf(":") > 0) {
    ;[key, search] = search.split(":")
  }
  search = search.toLowerCase()
  return items
    .filter(
      item =>
        item[key]
          .toString()
          .toLowerCase()
          .indexOf(search) !== -1
    )
    .splice(0, max)
}
