import React from 'react'
import { fetchMealSuggestions } from '../../meal_service'
import MealChip from './MealChip'

enum ActionType {
	KeepMeal = 'KeepMeal',
	UnkeepMeal = 'UnkeepMeal',
	LoadNewSuggestions = 'LoadNewSuggestions'
}

/**
 * 1. get random meals for ideas (regardless of count)
 * 2. keep meals for use in meal plan
 * 3. unkeep meals
 * 4. show kept meals in bottom of screen
 * 5. proceed to meal plan screen
 */

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

interface Props {
	maxNumberOfMeals: number
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
		case ActionType.LoadNewSuggestions:
			return {
				...state,
				suggestedMealIds: action.payload.mealIds
			}
		default:
			return state
	}
}

const MealSelectPage = (props: Props) => {
	const [state, dispatch] = React.useReducer(reducer, {
		keptMealIds: [],
		suggestedMealIds: []
	})
	const [isPendingSuggestions, setIsPendingSuggestions] = React.useState(false)

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

	return (
		<div>
			<div>
				<h3>Actions</h3>
				<button onClick={handleLoadSuggestions}>
					{isPendingSuggestions ? 'Loading...' : 'Get Suggestions'}
				</button>
			</div>
			<div>
				<h3>Suggestions</h3>
				<div>
					{state.suggestedMealIds.map(id => (
						<div
							key={id}
							onClick={() => {
								handleKeepMeal(id)
							}}
						>
							<MealChip mealId={id} />
						</div>
					))}
				</div>
			</div>
			<div>
				<h3>Kept Meal Ids</h3>
				<div>
					{state.keptMealIds.map(id => (
						<div
							key={id}
							onClick={() => {
								handleUnkeepMeal(id)
							}}
						>
							<MealChip mealId={id} />
						</div>
					))}
				</div>
			</div>
			<div>
				{state.keptMealIds.length > 0 ? (
					<button>Create Meal Plan</button>
				) : (
					<div>Select some meals above!</div>
				)}
			</div>
		</div>
	)
}

export default MealSelectPage
