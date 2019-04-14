import React from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import { ApolloProvider } from 'react-apollo'
import apolloClient from './graphql_client'
import './global.css'
import MealSelectPage from './pages/MealSelect/MealSelectPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import MealPlanPage from './pages/MealPlan/MealPlanPage'
import MealPositioningPage from './features/repositioning/MealPositioningPage'
import MealPlansPage from './pages/MealPlans/MealPlansPage'
import Nav from './shared/Nav'

const App = () => {
	return (
		<Router>
			<Nav>
				<ApolloProvider client={apolloClient}>
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/build" exact component={MealSelectPage} />
						<Route path="/plan" exact component={MealPlansPage} />
						<Route path="/plan/:planId" exact component={MealPlanPage} />
						<Route
							path="/repositioning"
							exact
							component={MealPositioningPage}
						/>
					</Switch>
				</ApolloProvider>
			</Nav>
		</Router>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
