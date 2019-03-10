export function getItem<T>(key: string): T | null {
	const result = localStorage.getItem(key)

	if (result == null) return null

	return JSON.parse(result)
}

export function setItem<T>(key: string, item: T) {
	const data = JSON.stringify(item)

	localStorage.setItem(key, data)
}
