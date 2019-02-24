import React from 'react'
import ItemPositionContext from './ItemPositionContext'

interface CardActionProps {
	itemId: string
}

const CardActions = ({ itemId }: CardActionProps) => {
	const { swapItem, getItemPositionById, itemIds, pinItem } = React.useContext(
		ItemPositionContext
	)
	const position = getItemPositionById(itemId)

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
