import React from 'react'
import { MealPlan } from '../../types'
import { getPlans } from '../../meal_service'
import { Link } from 'react-router-dom'

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
						<div key={plan.id}>
							<Link to={`/plan/${plan.id}`}>{plan.planName}</Link>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default MealPlansPage
