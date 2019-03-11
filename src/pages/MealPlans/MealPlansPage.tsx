import React from 'react'
import { MealPlan } from '../../types'
import { getPlans } from '../../meal_service'
import BigLink from '../../shared/BigLink'

const MealPlansPage = () => {
	const [plans, setPlans] = React.useState<MealPlan[]>([])

	React.useEffect(() => {
		getPlans().then(foundPlans => setPlans(foundPlans))
	}, [])

	return (
		<div>
			<h2>Meal Plans</h2>
			<div>
				{plans.map(plan => {
					return (
						<BigLink to={`/plan/${plan.id}`} key={plan.id}>
							{plan.planName}
						</BigLink>
					)
				})}
			</div>
		</div>
	)
}

export default MealPlansPage
