import React from 'react'
import PositionContext from './PositionContext'

interface CardActionProps {
	itemId: string
}

const CardActions = ({ itemId }: CardActionProps) => {
	const { swapItem, getPositionById, itemIds, pinItem } = React.useContext(
		PositionContext
	)
	const position = getPositionById(itemId)

	// TODO: this is workaround for null reference on
	// meal plan update
	if (position == null) return null

	return (
		<div>
			<div>
				{position.currentIndex !== 0 ? (
					<button onClick={() => swapItem(itemId, true)}>Up</button>
				) : null}
				{itemIds.length - 1 !== position.currentIndex ? (
					<button onClick={() => swapItem(itemId, false)}>Down</button>
				) : null}
			</div>
			<button onClick={() => pinItem(itemId)}>
				{position.isPinned ? 'Unlock' : 'Lock'}
			</button>
		</div>
	)
}

export default CardActions
