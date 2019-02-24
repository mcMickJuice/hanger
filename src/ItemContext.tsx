import React from 'react'
import { Item } from './types'

interface ItemContextType {
	// pinItem: (id: string) => void
	randomizeOrder: () => void
	swapItem: (id: string, isUp: boolean) => void
	itemIds: string[]
	// getItemById: (id: string) => Item
}

const ItemContext = React.createContext<ItemContextType>({
	// pinItem: (_: string) => {
	// 	throw new Error('pin item called')
	// },
	randomizeOrder: () => {
		throw new Error('randomize order called')
	},
	swapItem: (_: string, __: boolean) => {
		throw new Error('swapItem called')
	},
	itemIds: []
	// getItemById: (_: string) => {
	// 	throw new Error('item by id called')
	// }
})

export default ItemContext

// function swapPositions(idToSwap, currentIds, isUp) {
//   let previousIndex = 0
//   currentIds.forEach((id, idx) => {
//     if (id === idToSwap) {
//       previousIndex = idx
//     }
//   })
//   const targetIndex = previousIndex + (isUp ? -1 : 1)
//   const clone = [...currentIds]
//   clone[previousIndex] = currentIds[targetIndex]
//   clone[targetIndex] = currentIds[previousIndex]

//   return clone
// }

interface ItemProviderProps {
	initialItems: Item[]
}

interface SortPosition {
	currentIndex: number
	isPinned: boolean
	id: string
}

interface ItemPositionMap {
	[id: string]: SortPosition
}

interface ItemProviderState {
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

export class ItemProvider extends React.Component<
	ItemProviderProps,
	ItemProviderState
> {
	constructor(props: ItemProviderProps) {
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

	render() {
		return (
			<ItemContext.Provider
				value={{
					randomizeOrder: this.handleRandomizeOrder,
					swapItem: this.handleSwapItem,
					itemIds: this.state.itemIds
				}}
			>
				{this.props.children}
			</ItemContext.Provider>
		)
	}
}
