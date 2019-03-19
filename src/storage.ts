export function getItem<T>(key: string): T | null {
	const result = localStorage.getItem(key)

	if (result == null) return null

	return JSON.parse(result)
}

export function setItem<T>(key: string, item: T) {
	const data = JSON.stringify(item)

	localStorage.setItem(key, data)
}

export function removeItem(key: string) {
	localStorage.removeItem(key)
}

export function getListFromPrefix<T>(prefix: string): T[] {
	const numberInStorage = localStorage.length
	const items = []
	for (let i = 0; i < numberInStorage; i++) {
		const keyInPosition = localStorage.key(i)
		if (keyInPosition != null && keyInPosition.startsWith(prefix)) {
			const data = localStorage.getItem(keyInPosition)

			if (data != null) {
				items.push(JSON.parse(data))
			}
		}
	}

	return items
}
