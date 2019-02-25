import React from 'react'
import PositionContext from './PositionContext'
import MealPlanContext from './MealPlanContext'
import { Meal } from './types'

const dbMeals: Meal[] = Array.from({ length: 12 }, (_, idx) => idx).map(i => ({
	id: i.toString(),
	name: `Item number ${i}`
}))

const useFetchMealPlans = () => {
	const [meals, updateMeals] = React.useState<Meal[]>([])

	function generateNewMealPlan() {
		const newMeals = dbMeals
			.sort(() => (Math.random() > 0.5 ? 1 : -1))
			.slice(0, 7)

		updateMeals(newMeals)
	}

	return { meals, generateNewMealPlan }
}

const MealPlanActions = () => {
	const { meals, generateNewMealPlan } = useFetchMealPlans()
	const { loadMeals } = React.useContext(MealPlanContext)
	const { randomizeOrder } = React.useContext(PositionContext)
	React.useEffect(() => {
		loadMeals(meals)
	}, [meals])

	return (
		<div>
			<button onClick={randomizeOrder}>Randomize</button>
			<button onClick={generateNewMealPlan}>Generate new plan</button>
		</div>
	)
}

export default MealPlanActions
