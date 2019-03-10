import React from 'react'
import ReactDOM from 'react-dom'
// import MealPlanPage from './MealPlanPage'
import MealSelectPage from './pages/MealSelect/MealSelectPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import MealPlanPage from './pages/MealPlan/MealPlanPage'
import MealPositioningPage from './features/repositioning/MealPositioningPage'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/build" exact component={MealSelectPage} />
				<Route
					path="/plan"
					exact
					component={() => <div>Meal Listing Page</div>}
				/>
				<Route path="/plan/:planId" exact component={MealPlanPage} />
				<Route path="/repositioning" exact component={MealPositioningPage} />
			</Switch>
		</Router>
	)
	return <MealSelectPage maxNumberOfMeals={7} />
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
