import React from 'react'
import MealContext from './MealPlanContext'

interface MealCardProps {
	id: string
}

const MealCard = ({ id }: MealCardProps) => {
	const { getMealById } = React.useContext(MealContext)

	const meal = getMealById(id)

	// TODO: this is workaround for null reference on
	// meal plan update
	if (meal == null) return null

	return <div>Meal - {meal.name}</div>
}

export default MealCard
