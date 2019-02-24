import React from 'react'
import ItemPositionContext from './ItemPositionContext'

interface CardActionProps {
	itemId: string
}

const CardActions = ({ itemId }: CardActionProps) => {
	const { swapItem } = React.useContext(ItemPositionContext)

	return (
		<div>
			<button onClick={() => swapItem(itemId, true)}>Up</button>
			<button onClick={() => swapItem(itemId, false)}>Down</button>
		</div>
	)
}

export default CardActions
