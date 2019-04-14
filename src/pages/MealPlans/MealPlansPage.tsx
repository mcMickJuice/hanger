import React from 'react'
import { MealPlan } from '../../types'
import { getPlans } from '../../meal_service'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

const query = gql`
	{
		mealPlans {
			id
			planName
		}
	}
`

const MealPlansPage = () => {
	return (
		<div>
			<h2>Meal Plans</h2>
			<div>
				<Query<{ mealPlans: MealPlan[] }> query={query}>
					{({ loading, error, data }) => {
						if (loading) {
							return <div>Loading...</div>
						}

						if (error) {
							return <div>There was an error</div>
						}

						if (data != null) {
							return data.mealPlans.map(plan => {
								return (
									<div key={plan.id}>
										<Link to={`/plan/${plan.id}`}>{plan.planName}</Link>
									</div>
								)
							})
						} else {
							return <div>There are no meals</div>
						}
					}}
				</Query>
			</div>
		</div>
	)
}

export default MealPlansPage
