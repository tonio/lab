import CSV from "csv.js"

export const CAT = "Catégorie"
export const ROOM = "Salle"
export const NAME = "Nom"
export const PL = "Placard"
export const NB = "Quantité"
export const OO = "Rebut"
export const CM = "Remarque"
export const SLUGS = {
  [CAT]: "cat",
  [ROOM]: "room"
}

const url =
  "https://docs.google.com/spreadsheets/d/e/" +
  "2PACX-1vQR5DfQy_hzpZXaQAhbUp5XkjeIVnMzyNP-pKLl8s6dUlAfWO-aM9Rsb68owsADh9IxyR2ja96FZ6R9" +
  "/pub?output=csv"

const clean = s => {
  if (s[NAME][0] === '"') s[NAME] = s[NAME].slice(1, s[NAME].length - 1)
}

export async function loadData() {
  return fetch(url)
    .then(r => r.text())
    .then(data => CSV.decode(data))
    .then(rows => rows.forEach(clean) || rows)
    .then(rows => rows.sort((a, b) => a.Nom.localeCompare(b.Nom)))
}

export function extract(items, key) {
  return [...new Set(items.map(i => i[key]))].sort((a, b) => a.toString().localeCompare(b.toString()))
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
