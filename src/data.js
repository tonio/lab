import CSV from "csv.js"
import deburr from "lodash.deburr"

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

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSN7PTLQguJoI4-XzKxT7e6DOiVeJGNTOD4iwEo9XfICxki144NU8TZgvRiXrpUn2htBgPCpa3DhtfH/pub?gid=1946404634&single=true&output=csv"

const clean = s => {
  if (s[NAME][0] === '"') {
    s[NAME] = s[NAME].slice(1, s[NAME].length - 1)
  }
  s[NAME] = s[NAME].charAt(0).toUpperCase() + s[NAME].slice(1)
  s.debured = deburr(s[NAME]).toLowerCase()
}

export async function loadData() {
  return fetch(url)
    .then(r => r.text())
    .then(data => CSV.decode(data))
    .then(rows => rows.forEach(clean) || rows)
    .then(rows => rows.sort((a, b) => a.Nom.localeCompare(b.Nom)))
}

export function extract(items, key) {
  return [...new Set(items.map(i => i[key]))].sort((a, b) =>
    a.toString().localeCompare(b.toString())
  )
}

export function match(search, items, max) {
  let key = "Nom"
  if (search.indexOf(":") > 0) {
    ;[key, search] = search.split(":")
  }
  if (key === "Nom") {
    key = "debured"
    search = deburr(search).toLowerCase()
  }
  return items
    .filter(
      item =>
        item[key]
          .toString()
          .indexOf(search) !== -1
    )
    .splice(0, max)
}
