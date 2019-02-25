import React from 'react'
import { Item, ItemPositionMap, ItemPosition } from './types'
import { generateOrderWithPinned } from './sort_utility'

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

interface ItemPositionProviderState {
	positionState: ItemPositionMap
	itemIds: string[]
}

const randomSort = (): 1 | -1 => (Math.random() > 0.5 ? 1 : -1)

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
			positionState,
			itemIds: getItemIdsFromCurrentPositions(positionState)
		}
	}

	handleRandomizeOrder = () => {
		const { positionState } = this.state
		const positions = Object.values(positionState)
		const pinnedPositions = positions
			.filter(p => p.isPinned)
			.map(p => {
				return {
					index: p.currentIndex,
					item: p.id
				}
			})
		const nonPinnedPositions = positions
			.filter(p => !p.isPinned)
			.map(p => p.id)
			.sort(randomSort)

		const sortedIds = generateOrderWithPinned(
			nonPinnedPositions,
			pinnedPositions
		)

		console.log(sortedIds)

		const newPositionState: ItemPositionMap = {}
		sortedIds.forEach((id, idx) => {
			const position = positionState[id]
			newPositionState[id] = {
				...position,
				currentIndex: idx
			}
		})

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
