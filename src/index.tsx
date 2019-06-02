import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import './global.css'
import { IdentityContextProvider } from 'react-netlify-identity-widget'
import MealSelectPage from './pages/MealSelect/MealSelectPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import MealPlanPage from './pages/MealPlan/MealPlanPage'
import MealPositioningPage from './features/repositioning/MealPositioningPage'
import MealPlansPage from './pages/MealPlans/MealPlansPage'
import SharedMealPlan from './pages/MealPlan/SharedMealPlan'
import Nav from './shared/Nav'

const url = process.env.REACT_APP_NETLIFY_URL || 'FAKE_URL'

const App = () => {
	return (
		<IdentityContextProvider url={url}>
			<Router>
				<Nav>
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/build" exact component={MealSelectPage} />
						<Route path="/plan" exact component={MealPlansPage} />
						<Route path="/plan/share" exact component={SharedMealPlan} />
						<Route path="/plan/:planId" exact component={MealPlanPage} />
						<Route
							path="/repositioning"
							exact
							component={MealPositioningPage}
						/>
					</Switch>
				</Nav>
			</Router>
		</IdentityContextProvider>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
