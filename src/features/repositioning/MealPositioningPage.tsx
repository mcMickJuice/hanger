import React from 'react'
import MealPlanContext, { MealProvider } from './MealPlanContext'
import { PositionProvider } from './PositionContext'
import Cards from './Cards'
import MealPlanActions from './MealPlanActions'

interface MealPlanPageState {
	errorMessage: string
}

class MealPositioningPage extends React.Component<{}, MealPlanPageState> {
	state: MealPlanPageState = {
		errorMessage: ''
	}

	componentDidCatch(e: any) {
		this.setState({
			errorMessage: e.message || 'Unknown error occurred'
		})
	}

	handleResetError = () => {
		this.setState({
			errorMessage: ''
		})
	}

	render() {
		const { errorMessage } = this.state
		return errorMessage !== '' ? (
			<div>
				<div>An error has occurred: {errorMessage}</div>
				<button onClick={this.handleResetError}>Reset Page</button>
			</div>
		) : (
			<MealProvider>
				<MealPlanPositioner />
			</MealProvider>
		)
	}
}

const MealPlanPositioner = () => {
	const { getMealsForPlan } = React.useContext(MealPlanContext)
	const meals = getMealsForPlan()

	return (
		<PositionProvider items={meals}>
			<MealPlanActions />
			<Cards />
		</PositionProvider>
	)
}

export default MealPositioningPage
