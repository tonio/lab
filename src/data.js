import CSV from 'csv.js'

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbUP2MhLu5P34MJvOq1OqlLRAmQKMCjfILzEF-Ldcu7eF7UY-7f0Z2okTe-iIVUYUalpYhSK-KeM05/pub?output=csv'

export async function loadData() {
  return fetch(url).then(r => r.text()).then(data => CSV.decode(data))
}
