import React from 'react'
import MealTileGrid from './MealTileGrid'
import MealTile from './MealTile'
import { RouteComponentProps } from 'react-router'
import CreateMealPlanForm from './CreateMealForm'
import Button from '@material-ui/core/Button'
import MealSuggestions from './MealSuggestions'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

enum ActionType {
	KeepMeal = 'KeepMeal',
	UnkeepMeal = 'UnkeepMeal',
	LoadNewSuggestions = 'LoadNewSuggestions'
}

type Action = KeepMealAction | UnkeepMealAction

interface KeepMealAction {
	type: ActionType.KeepMeal
	payload: {
		mealId: string
	}
}

interface UnkeepMealAction {
	type: ActionType.UnkeepMeal
	payload: {
		mealId: string
	}
}

interface State {
	keptMealIds: string[]
	suggestedMealIds: string[]
}

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.KeepMeal: {
			return {
				...state,
				keptMealIds: [...state.keptMealIds, action.payload.mealId]
			}
		}
		case ActionType.UnkeepMeal:
			return {
				...state,
				keptMealIds: state.keptMealIds.filter(
					mealId => action.payload.mealId !== mealId
				)
			}
		default:
			return state
	}
}

const query = gql`
	query SelectedMealsQuery($selectedIds: [ID!]!) {
		meals(filter: { filterType: INCLUDE, ids: $selectedIds }) {
			id
			mealName
		}
	}
`

const MealSelectPage = (props: RouteComponentProps) => {
	const [state, dispatch] = React.useReducer(reducer, {
		keptMealIds: [],
		suggestedMealIds: []
	})

	const [isPendingCreate, setIsPendingCreate] = React.useState(false)

	function handleKeepMeal(mealId: string) {
		const action: KeepMealAction = {
			type: ActionType.KeepMeal,
			payload: {
				mealId
			}
		}

		dispatch(action)
	}

	function handleUnkeepMeal(mealId: string) {
		const action: UnkeepMealAction = {
			type: ActionType.UnkeepMeal,
			payload: {
				mealId
			}
		}

		dispatch(action)
	}

	function handleSavePlan(mealPlanId: string) {
		//navigate to meal Plan page
		props.history.push(`/plan/${mealPlanId}`)
	}

	return (
		<div>
			<MealSuggestions
				keptMealIds={state.keptMealIds}
				onKeepMeal={handleKeepMeal}
			/>

			{state.keptMealIds.length > 0 ? (
				<div>
					<h3>Can't wait to eat...</h3>
					<Query<
						{ meals: { id: string; mealName: string }[] },
						{
							selectedIds: string[]
						}
					>
						query={query}
						variables={{ selectedIds: state.keptMealIds }}
					>
						{({ loading, error, data }) => {
							if (loading) {
								return <div>Loading...</div>
							}
							if (error) {
								return <div>There was an error</div>
							}
							if (data == null) {
								return <div>No Data to Show</div>
							}
							return (
								<MealTileGrid>
									{data.meals.map(meal => (
										<MealTile
											style={{
												backgroundColor: '#60c564'
											}}
											key={meal.id}
											onClick={() => {
												handleUnkeepMeal(meal.id)
											}}
										>
											<div>{meal.mealName}</div>
										</MealTile>
									))}
								</MealTileGrid>
							)
						}}
					</Query>

					<Button
						disabled={state.keptMealIds.length === 0}
						onClick={() => setIsPendingCreate(true)}
					>
						Let's Plan our Eating!
					</Button>

					{isPendingCreate ? (
						<div>
							<CreateMealPlanForm
								onMealCreated={handleSavePlan}
								mealIds={state.keptMealIds}
							/>
							<Button
								style={{ backgroundColor: 'gray' }}
								onClick={() => setIsPendingCreate(false)}
							>
								Cancel
							</Button>
						</div>
					) : null}
				</div>
			) : (
				<div>Select some meals above!</div>
			)}
		</div>
	)
}

export default MealSelectPage
