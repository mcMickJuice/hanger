import React from 'react'
import ItemContext from './ItemContext'

interface CardActionProps {
	itemId: string
}

const CardActions = ({ itemId }: CardActionProps) => {
	const { swapItem } = React.useContext(ItemContext)

	return (
		<div>
			<button onClick={() => swapItem(itemId, true)}>Up</button>
			<button onClick={() => swapItem(itemId, false)}>Down</button>
		</div>
	)
}

export default CardActions
