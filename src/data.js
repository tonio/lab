import CSV from 'csv.js'

const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQbUP2MhLu5P34MJvOq1OqlLRAmQKMCjfILzEF-Ldcu7eF7UY-7f0Z2okTe-iIVUYUalpYhSK-KeM05/pub?output=csv'

export async function loadData() {
  let response = await fetch(url)
  const data = await response.text()
  const lines = CSV.decode(data)
  console.log(lines)
  return Promise.resolve(lines)
}
