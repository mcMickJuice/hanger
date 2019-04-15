import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { Meal as MealType } from '../../types'
import MealTileGrid from './MealTileGrid'
import MealTile from './MealTile'
import Meal from '../MealSelect/Meal'
import { Button } from '@material-ui/core'

interface Props {
	keptMealIds: string[]
	onKeepMeal: (mealId: string) => void
}

const query = gql`
	query GetMealSuggestions($excludeIds: [ID!]!) {
		meals(filter: { filterType: EXCLUDE, ids: $excludeIds }) {
			id
			mealName
		}
	}
`

const MealSuggestions = ({ keptMealIds, onKeepMeal }: Props) => {
	const [excludedMealIds, setExcludedMealIds] = React.useState(keptMealIds)
	function handleLoadSuggestions(previousMealIds: string[]) {
		const ids = [...previousMealIds, ...keptMealIds]
		setExcludedMealIds(ids)
	}

	return (
		<div>
			<Query<{ meals: MealType[] }, { excludeIds: string[] }>
				query={query}
				variables={{
					excludeIds: excludedMealIds
				}}
			>
				{({ loading, error, data }) => {
					if (loading) {
						return <div>Loading...</div>
					}

					if (error) {
						return <div>There was an error</div>
					}

					if (data == null) {
						return <div>There are no meals to show</div>
					}

					return (
						<React.Fragment>
							<div>
								<Button
									onClick={() =>
										handleLoadSuggestions(data.meals.map(m => m.id))
									}
								>
									Get More Suggestions
								</Button>
							</div>
							<MealTileGrid>
								{data.meals.map(meal => {
									const isSelected = keptMealIds.includes(meal.id)
									return (
										<MealTile
											style={{
												backgroundColor: 'tomato',

												opacity: isSelected ? 0.4 : 1,
												cursor: isSelected ? 'not-allowed' : 'pointer'
											}}
											key={meal.id}
											onClick={() => {
												if (isSelected) return
												onKeepMeal(meal.id)
											}}
										>
											<Meal meal={meal} />
										</MealTile>
									)
								})}
							</MealTileGrid>
						</React.Fragment>
					)
				}}
			</Query>
		</div>
	)
}

export default MealSuggestions
