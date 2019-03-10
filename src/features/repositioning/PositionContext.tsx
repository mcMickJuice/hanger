import React from 'react'
import { generateOrderWithPinned } from './sort_utility'

interface PositionContextType {
	pinItem: (id: string) => void
	randomizeOrder: () => void
	swapItem: (id: string, isUp: boolean) => void
	itemIds: string[]
	getPositionById: (id: string) => Position | undefined
	getPinnedItems: () => string[]
}

export interface Position {
	currentIndex: number
	isPinned: boolean
	id: string
}

export interface PositionMap {
	[id: string]: Position
}

const PositionContext = React.createContext<PositionContextType>({
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
	getPositionById: (_: string) => {
		throw new Error('item by id called')
	},
	getPinnedItems: () => {
		throw new Error('getPinnedItems calls')
	}
})

export default PositionContext

interface PositionProviderProps {
	items: { id: string }[]
}

interface PositionProviderState {
	positionState: PositionMap
	itemIds: string[]
}

const randomSort = (): 1 | -1 => (Math.random() > 0.5 ? 1 : -1)

const getIdsFromCurrentPositions = (positionState: PositionMap): string[] =>
	Object.entries(positionState)
		.sort((first, second) => {
			return first[1].currentIndex - second[1].currentIndex
		})
		.map(([key]) => key)

export class PositionProvider extends React.Component<
	PositionProviderProps,
	PositionProviderState
> {
	constructor(props: PositionProviderProps) {
		super(props)

		const cache: PositionMap = {}
		const positionState = props.items.reduce((acc, next, idx) => {
			acc[next.id] = { currentIndex: idx, isPinned: false, id: next.id }
			return acc
		}, cache)

		this.state = {
			positionState,
			itemIds: getIdsFromCurrentPositions(positionState)
		}
	}

	componentDidUpdate(prevProps: PositionProviderProps) {
		if (prevProps.items !== this.props.items) {
			const pinnedMeals = this.props.items
				.filter(item => {
					const position = this.state.positionState[item.id]
					return position != null && position.isPinned
				})
				.map(item => {
					const position = this.state.positionState[item.id]
					return {
						index: position.currentIndex,
						item: item.id
					}
				})
			const nonPinned = this.props.items
				.filter(item => {
					const position = this.state.positionState[item.id]
					return position == null || !position.isPinned
				})
				.map(item => item.id)

			const sortedIds = generateOrderWithPinned(nonPinned, pinnedMeals)

			const newPositionState: PositionMap = {}
			sortedIds.forEach((id, idx) => {
				const position = this.state.positionState[id]
				if (position == null) {
					newPositionState[id] = {
						isPinned: false,
						id,
						currentIndex: idx
					}
				} else {
					newPositionState[id] = {
						...position,
						currentIndex: idx
					}
				}
			})
			const currentIndexes = Object.values(newPositionState).map(
				r => r.currentIndex
			)
			const cache = {} as any
			currentIndexes.forEach(i => {
				if (cache[i] != null) {
					console.log(newPositionState)
					throw new Error('Invariant: duplicate indices')
				}
				cache[i] = true
			})

			this.setState({
				positionState: newPositionState,
				itemIds: getIdsFromCurrentPositions(newPositionState)
			})
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

		const newPositionState: PositionMap = {}
		sortedIds.forEach((id, idx) => {
			const position = positionState[id]
			newPositionState[id] = {
				...position,
				currentIndex: idx
			}
		})

		this.setState({
			positionState: newPositionState,
			itemIds: getIdsFromCurrentPositions(newPositionState)
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
			itemIds: getIdsFromCurrentPositions(newPositionState)
		})
	}

	handlePinItem = (id: string) => {
		const { positionState } = this.state
		const positionItemToUpdate = positionState[id]

		const newPositionState: PositionMap = {
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

	handleGetPinnedItems = () => {
		return Object.values(this.state.positionState)
			.filter(p => p.isPinned)
			.map(p => p.id)
	}

	render() {
		return (
			<PositionContext.Provider
				value={{
					randomizeOrder: this.handleRandomizeOrder,
					swapItem: this.handleSwapItem,
					itemIds: this.state.itemIds,
					getPositionById: this.handleGetItemPosition,
					pinItem: this.handlePinItem,
					getPinnedItems: this.handleGetPinnedItems
				}}
			>
				{this.props.children}
			</PositionContext.Provider>
		)
	}
}
