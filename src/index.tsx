import React from 'react'
import ReactDOM from 'react-dom'
import MealPlanPage from './MealPlanPage'

const App = () => {
	return <MealPlanPage />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
