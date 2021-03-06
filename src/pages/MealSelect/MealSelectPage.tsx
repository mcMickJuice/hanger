import React from 'react'
import { fetchMealSuggestions } from '../../meal_service'
import MealChip from '../../shared/MealChip'
import MealTileGrid from './MealTileGrid'
import MealTile from './MealTile'
import { RouteComponentProps } from 'react-router'
import CreateMealPlanForm from './CreateMealForm'
import Button from '@material-ui/core/Button'

enum ActionType {
	KeepMeal = 'KeepMeal',
	UnkeepMeal = 'UnkeepMeal',
	LoadNewSuggestions = 'LoadNewSuggestions'
}

type Action = KeepMealAction | UnkeepMealAction | LoadNewSuggestionsAction

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

interface LoadNewSuggestionsAction {
	type: ActionType.LoadNewSuggestions
	payload: {
		mealIds: string[]
	}
}

interface State {
	keptMealIds: string[]
	suggestedMealIds: string[]
}

// interface Props {
// 	maxNumberOfMeals: number
// }

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
		case ActionType.LoadNewSuggestions:
			return {
				...state,
				suggestedMealIds: action.payload.mealIds
			}
		default:
			return state
	}
}

const MealSelectPage = (props: RouteComponentProps) => {
	const [state, dispatch] = React.useReducer(reducer, {
		keptMealIds: [],
		suggestedMealIds: []
	})
	const [isPendingSuggestions, setIsPendingSuggestions] = React.useState(false)
	const [isPendingCreate, setIsPendingCreate] = React.useState(false)

	React.useEffect(() => {
		handleLoadSuggestions()
	}, [])

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

	async function handleLoadSuggestions() {
		setIsPendingSuggestions(true)

		//make call, excluding kept meals

		const mealIds = await fetchMealSuggestions(12, state.keptMealIds)

		const action: LoadNewSuggestionsAction = {
			type: ActionType.LoadNewSuggestions,
			payload: {
				mealIds
			}
		}
		setIsPendingSuggestions(false)
		dispatch(action)
	}

	function handleSavePlan(mealPlanId: string) {
		//navigate to meal Plan page
		props.history.push(`/plan/${mealPlanId}`)
	}

	return (
		<div>
			<div>
				<Button onClick={handleLoadSuggestions}>
					{isPendingSuggestions ? 'Loading...' : 'Get More Suggestions'}
				</Button>
			</div>
			<div>
				<h3>Do you wanna eat...</h3>
				<MealTileGrid>
					{state.suggestedMealIds.map(id => {
						const isSelected = state.keptMealIds.includes(id)
						return (
							<MealTile
								style={{
									backgroundColor: 'tomato',

									opacity: isSelected ? 0.4 : 1,
									cursor: isSelected ? 'not-allowed' : 'pointer'
								}}
								key={id}
								onClick={() => {
									if (isSelected) return
									handleKeepMeal(id)
								}}
							>
								<MealChip mealId={id} />
							</MealTile>
						)
					})}
				</MealTileGrid>
			</div>
			{state.keptMealIds.length > 0 ? (
				<div>
					<h3>Can't wait to eat...</h3>
					<MealTileGrid>
						{state.keptMealIds.map(id => (
							<MealTile
								style={{
									backgroundColor: '#60c564'
								}}
								key={id}
								onClick={() => {
									handleUnkeepMeal(id)
								}}
							>
								<MealChip mealId={id} />
							</MealTile>
						))}
					</MealTileGrid>
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
