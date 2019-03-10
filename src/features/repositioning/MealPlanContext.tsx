import React from 'react'
import { Meal } from '../../types'

interface MealPlanContextType {
	getMealById: (id: string) => Meal | undefined
	getMealsForPlan: () => Meal[]
	loadMeals: (meals: Meal[]) => void
}

const MealContext = React.createContext<MealPlanContextType>({
	getMealById: () => {
		throw new Error('getMealById not implemented')
	},
	getMealsForPlan: () => {
		throw new Error('getMealsForPlan')
	},
	loadMeals: (_: Meal[]) => {
		throw new Error('load Meals not implemented')
	}
})

export default MealContext

interface MealProviderState {
	meals: Meal[]
}

export class MealProvider extends React.Component<{}, MealProviderState> {
	constructor(props: {}) {
		super(props)

		this.state = { meals: [] }
	}
	getMealById = (id: string) => {
		const meal = this.state.meals.find(m => m.id === id)

		// if (meal == null) {
		// 	throw new Error(`Meal not found for id ${id}`)
		// }

		return meal
	}
	getMealsForPlan = () => {
		return this.state.meals
	}
	loadMeals = (meals: Meal[]) => {
		this.setState({
			meals
		})
	}
	render() {
		return (
			<MealContext.Provider
				value={{
					getMealById: this.getMealById,
					getMealsForPlan: this.getMealsForPlan,
					loadMeals: this.loadMeals
				}}
			>
				{this.props.children}
			</MealContext.Provider>
		)
	}
}
