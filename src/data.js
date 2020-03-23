import CSV from 'csv.js'

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbUP2MhLu5P34MJvOq1OqlLRAmQKMCjfILzEF-Ldcu7eF7UY-7f0Z2okTe-iIVUYUalpYhSK-KeM05/pub?output=csv'

export async function loadData() {
  return fetch(url)
    .then(r => r.text())
    .then(data => CSV.decode(data))
    .then(items => items.sort((a, b) => a.Nom.localeCompare(b.Nom)))
}

export function match(search, items, max) {
  search = search.toLowerCase()
  return items.filter(item => item.Nom.toLowerCase().indexOf(search) !== -1).splice(0, max)
}
