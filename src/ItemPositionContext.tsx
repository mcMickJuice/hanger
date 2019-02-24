import React from 'react'
import { Item } from './types'

interface ItemPositionContextType {
	pinItem: (id: string) => void
	randomizeOrder: () => void
	swapItem: (id: string, isUp: boolean) => void
	itemIds: string[]
	getItemPositionById: (id: string) => ItemPosition
}

const ItemPositionContext = React.createContext<ItemPositionContextType>({
	pinItem: (_: string) => {
		throw new Error('pin item called')
	},
	randomizeOrder: () => {
		throw new Error('randomize order called')
	},
	swapItem: (_: string, __: boolean) => {
		throw new Error('swapItem called')
	},
	itemIds: [],
	getItemPositionById: (_: string) => {
		throw new Error('item by id called')
	}
})

export default ItemPositionContext

interface ItemPositionProviderProps {
	initialItems: Item[]
}

interface ItemPosition {
	currentIndex: number
	isPinned: boolean
	id: string
}

interface ItemPositionMap {
	[id: string]: ItemPosition
}

interface ItemPositionProviderState {
	positionState: ItemPositionMap
	itemIds: string[]
	items: Item[]
}

const getItemIdsFromCurrentPositions = (
	positionState: ItemPositionMap
): string[] =>
	Object.entries(positionState)
		.sort((first, second) => {
			return first[1].currentIndex - second[1].currentIndex
		})
		.map(([key]) => key)

export class ItemPositionProvider extends React.Component<
	ItemPositionProviderProps,
	ItemPositionProviderState
> {
	constructor(props: ItemPositionProviderProps) {
		super(props)

		const cache: ItemPositionMap = {}
		const positionState = props.initialItems.reduce((acc, next, idx) => {
			acc[next.id] = { currentIndex: idx, isPinned: false, id: next.id }
			return acc
		}, cache)

		this.state = {
			items: props.initialItems,
			positionState,
			itemIds: getItemIdsFromCurrentPositions(positionState)
		}
	}

	handleRandomizeOrder = () => {
		const items = this.state.items.slice(0).sort(() => {
			return Math.random() > 0.5 ? 1 : -1
		})

		const cache: ItemPositionMap = {}

		const { positionState } = this.state
		const newPositionState = items.reduce((acc, next, idx) => {
			const currentPosition = positionState[next.id]
			acc[next.id] = { ...currentPosition, currentIndex: idx, id: next.id }
			return acc
		}, cache)

		this.setState({
			positionState: newPositionState,
			itemIds: getItemIdsFromCurrentPositions(newPositionState)
		})
	}

	handleSwapItem = (id: string, isUp: boolean) => {
		const currentItem = this.state.positionState[id]
		const nextPosition = currentItem.currentIndex + (isUp ? -1 : 1)

		const nextPositionEntry = Object.entries(this.state.positionState).find(
			([_, value]) => {
				return value.currentIndex === nextPosition
			}
		)

		if (nextPositionEntry == null) {
			throw new Error(
				`No Position Entry found for entry at position ${nextPosition}`
			)
		}

		const newPositionState = {
			...this.state.positionState,
			[id]: {
				...currentItem,
				currentIndex: nextPosition
			},
			[nextPositionEntry[0]]: {
				...nextPositionEntry[1],
				currentIndex: currentItem.currentIndex
			}
		}

		this.setState({
			positionState: newPositionState,
			itemIds: getItemIdsFromCurrentPositions(newPositionState)
		})
	}

	handlePinItem = (id: string) => {
		const { positionState } = this.state
		const positionItemToUpdate = positionState[id]

		const newPositionState: ItemPositionMap = {
			...positionState,
			[id]: {
				...positionItemToUpdate,
				isPinned: !positionItemToUpdate.isPinned
			}
		}

		this.setState({
			positionState: newPositionState
		})
	}

	handleGetItemPosition = (id: string) => {
		return this.state.positionState[id]
	}

	render() {
		return (
			<ItemPositionContext.Provider
				value={{
					randomizeOrder: this.handleRandomizeOrder,
					swapItem: this.handleSwapItem,
					itemIds: this.state.itemIds,
					getItemPositionById: this.handleGetItemPosition,
					pinItem: this.handlePinItem
				}}
			>
				{this.props.children}
			</ItemPositionContext.Provider>
		)
	}
}
