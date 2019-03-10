import React from 'react'
import PositionContext from './PositionContext'
import Button from '../../shared/Button'

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
					<Button onClick={() => swapItem(itemId, true)}>Up</Button>
				) : null}
				{itemIds.length - 1 !== position.currentIndex ? (
					<Button onClick={() => swapItem(itemId, false)}>Down</Button>
				) : null}
			</div>
			<Button onClick={() => pinItem(itemId)}>
				{position.isPinned ? 'Unlock' : 'Lock'}
			</Button>
		</div>
	)
}

export default CardActions
