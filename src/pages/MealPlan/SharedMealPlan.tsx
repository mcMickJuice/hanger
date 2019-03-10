import React from 'react'
import { RouteComponentProps } from 'react-router'
import queryString from 'query-string'
import { MealPlan } from '../../types'
import { storeSharedPlan } from '../../meal_service'

const SharedMealPlan = (props: RouteComponentProps) => {
	React.useEffect(() => {
		const parsed = queryString.parse(props.location.search)

		const mealPlanName = parsed['mealPlanName'] as string
		const mealIds = parsed['mealIds'] as string[]
		const mealPlanId = parsed['mealPlanId'] as string

		const mealPlan: MealPlan = {
			id: mealPlanId,
			mealIds,
			planName: mealPlanName
		}

		storeSharedPlan(mealPlan).then(() => {
			props.history.replace(`/plan/${mealPlan.id}`)
		})
	}, [])

	return <div>Shared path - {props.location.search}</div>
}

export default SharedMealPlan
