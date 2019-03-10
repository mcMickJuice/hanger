import React from 'react'
import MealChip from '../../shared/MealChip'

interface Props {
	mealId: string
}

const style = {
	padding: '16px',
	backgroundColor: 'tomato'
}

const Meal = ({ mealId }: Props) => {
	return (
		<div style={style}>
			<MealChip mealId={mealId} />
		</div>
	)
}

export default Meal
