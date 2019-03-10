import React from 'react'
import ReactDOM from 'react-dom'
import MealSelectPage from './pages/MealSelect/MealSelectPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import MealPlanPage from './pages/MealPlan/MealPlanPage'
import MealPositioningPage from './features/repositioning/MealPositioningPage'
import MealPlansPage from './pages/MealPlans/MealPlansPage'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/build" exact component={MealSelectPage} />
				<Route path="/plan" exact component={MealPlansPage} />
				<Route path="/plan/:planId" exact component={MealPlanPage} />
				<Route path="/repositioning" exact component={MealPositioningPage} />
			</Switch>
		</Router>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
