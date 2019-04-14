import React from 'react'

import { Meal as MealType } from '../../types'

interface Props {
	meal: MealType
}

const style = {
	padding: '16px',
	backgroundColor: 'tomato'
}

const Meal = ({ meal }: Props) => {
	return (
		<div style={style}>
			<div>{meal.mealName}</div>
		</div>
	)
}

export default Meal
