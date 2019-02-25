import React from 'react'
import { Meal } from './types'

interface MealPlanContextType {
	getMealById: (id: string) => Meal
	getMealsForPlan: () => Meal[]
}

const MealContext = React.createContext<MealPlanContextType>({
	getMealById: () => {
		throw new Error('getMealById not implemented')
	},
	getMealsForPlan: () => {
		throw new Error('getMealsForPlan')
	}
})

export default MealContext

interface MealProviderProps {
	meals: Meal[]
}

interface MealProviderState {
	meals: Meal[]
}

export class MealProvider extends React.Component<
	MealProviderProps,
	MealProviderState
> {
	constructor(props: MealProviderProps) {
		super(props)

		this.state = { meals: props.meals }
	}
	getMealById = (id: string) => {
		const meal = this.state.meals.find(m => m.id === id)

		if (meal == null) {
			throw new Error(`Meal not found for id ${id}`)
		}

		return meal
	}
	getMealsForPlan = () => {
		return this.state.meals
	}
	render() {
		return (
			<MealContext.Provider
				value={{
					getMealById: this.getMealById,
					getMealsForPlan: this.getMealsForPlan
				}}
			>
				{this.props.children}
			</MealContext.Provider>
		)
	}
}
