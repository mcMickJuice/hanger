export interface Item {
	id: string
	text: string
}

export interface ItemPosition {
	currentIndex: number
	isPinned: boolean
	id: string
}

export interface ItemPositionMap {
	[id: string]: ItemPosition
}
