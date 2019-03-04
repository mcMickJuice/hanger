import React from 'react'
import ReactDOM from 'react-dom'
// import MealPlanPage from './MealPlanPage'
import MealSelectPage from './pages/MealSelect/MealSelectPage'

const App = () => {
	return <MealSelectPage maxNumberOfMeals={7} />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
