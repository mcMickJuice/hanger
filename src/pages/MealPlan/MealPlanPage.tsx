import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MealPlan } from '../../types'
import { fetchPlan } from '../../meal_service'
import Meal from '../MealSelect/Meal'

enum PageStateType {
	Initial = 'Initial',
	Loading = 'Loading',
	Error = 'Error',
	NoPlanFound = 'NoPlanFound',
	PlanFound = 'PlanFound'
}

type State =
	| {
			type: PageStateType.Initial
	  }
	| {
			type: PageStateType.Loading
	  }
	| {
			type: PageStateType.NoPlanFound
	  }
	| {
			type: PageStateType.PlanFound
			plan: MealPlan
	  }
	| {
			type: PageStateType.Error
			errorMessage: string
	  }

enum PageActionType {
	Loading = 'Loading',
	Error = 'Error',
	NoPlanFound = 'NoPlanFound',
	PlanFound = 'PlanFound'
}

type Action =
	| {
			type: PageActionType.Error
			errorMessage: string
	  }
	| {
			type: PageActionType.Loading
	  }
	| {
			type: PageActionType.NoPlanFound
	  }
	| {
			type: PageActionType.PlanFound
			mealPlan: MealPlan
	  }

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case PageActionType.Error:
			return {
				type: PageStateType.Error,
				errorMessage: action.errorMessage
			}

		case PageActionType.Loading:
			return {
				type: PageStateType.Loading
			}

		case PageActionType.NoPlanFound:
			return {
				type: PageStateType.NoPlanFound
			}

		case PageActionType.PlanFound:
			return {
				type: PageStateType.PlanFound,
				plan: action.mealPlan
			}
		default:
			return state
	}
}

function handleDeletePlan(planId: string) {}

const MealPlanRender = ({ pageState }: { pageState: State }) => {
	switch (pageState.type) {
		case PageStateType.Initial:
			return null
		case PageStateType.Error:
			return <div>An Error Occurred</div>
		case PageStateType.Loading:
			return <div>Loading Plan</div>
		case PageStateType.NoPlanFound:
			return <div>No Plan found</div>
		case PageStateType.PlanFound:
			const { plan } = pageState

			return (
				<div>
					{/* TODO: name of plan! */}
					<h2>Meal - {plan.id}</h2>
					{plan.mealIds.map(id => (
						<div style={{ marginBottom: '8px' }} key={id}>
							<Meal mealId={id} />
						</div>
					))}
				</div>
			)
		default:
			throw new Error(`Bad Page State`)
	}
}

const MealPlanPage = ({ match }: RouteComponentProps<{ planId: string }>) => {
	const { planId } = match.params
	const [state, dispatch] = React.useReducer(reducer, {
		type: PageStateType.Initial
	})

	React.useEffect(() => {
		dispatch({
			type: PageActionType.Loading
		})
		fetchPlan(planId)
			.then(mealPlan => {
				if (mealPlan == null) {
					dispatch({
						type: PageActionType.NoPlanFound
					})
				} else {
					dispatch({ type: PageActionType.PlanFound, mealPlan })
				}
			})
			.catch(err => {
				dispatch({
					type: PageActionType.Error,
					errorMessage: err.message
				})
			})
	}, [planId])

	return (
		<div>
			<h1>Meal Plan</h1>
			<MealPlanRender pageState={state} />
		</div>
	)
}

export default MealPlanPage
