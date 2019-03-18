import React from 'react'
import MealPlanContext, { MealProvider } from './MealPlanContext'
import { PositionProvider } from './PositionContext'
import Cards from './Cards'
import MealPlanActions from './MealPlanActions'
import Button from '@material-ui/core/Button'

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
				<Button onClick={this.handleResetError}>Reset Page</Button>
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
