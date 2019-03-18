import React from 'react'
import PositionContext from './PositionContext'
import MealPlanContext from './MealPlanContext'
import { Meal } from '../../types'
import { fetchMeals } from '../../meal_service'
import Button from '@material-ui/core/Button'

const useFetchMealPlans = () => {
	const { getPinnedItems } = React.useContext(PositionContext)
	const [meals, updateMeals] = React.useState<Meal[]>([])

	async function generateNewMealPlan() {
		const dbMeals = await fetchMeals()
		const pinnedItemIds = getPinnedItems()
		const pinnedMeals = dbMeals.filter(db => pinnedItemIds.includes(db.id))
		const newMeals = dbMeals
			.filter(db => !pinnedItemIds.includes(db.id))
			.sort(() => (Math.random() > 0.5 ? 1 : -1))
			.slice(0, 7 - pinnedItemIds.length)

		updateMeals([...pinnedMeals, ...newMeals])
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
			<Button onClick={randomizeOrder}>Randomize</Button>
			<Button onClick={generateNewMealPlan}>Generate new plan</Button>
		</div>
	)
}

export default MealPlanActions
