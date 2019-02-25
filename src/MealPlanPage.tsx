import React from 'react'
import MealPlanContext, { MealProvider } from './MealPlanContext'
import { PositionProvider } from './PositionContext'
import Cards from './Cards'
import MealPlanActions from './MealPlanActions'

const MealPlanPage = () => {
	return (
		<MealProvider>
			<MealPlanPositioner />
		</MealProvider>
	)
}

const MealPlanPositioner = () => {
	const { getMealsForPlan } = React.useContext(MealPlanContext)
	const meals = getMealsForPlan()

	return (
		<PositionProvider items={meals}>
			<MealPlanActions />
			<Cards />
		</PositionProvider>
	)
}

export default MealPlanPage
