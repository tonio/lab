import { writable } from 'svelte/store'
import { csvMapper } from './data'

export default function (url: string, defaultValue: []|{}, type='JSON') {
	const loading = writable(false)
	const error = writable(false)
	const data = writable(defaultValue)
	
	async function get() {
		loading.set(true)
		error.set(false)
		try {
			const response = await fetch(url)
			data.set(
        await ((type === 'CSV') ? csvMapper(response) : response.json())
      )
		} catch(e) {
			error.set(e)
		}
		loading.set(false)
	}
	
	get()
	
  return [ data, loading, error, get] }
