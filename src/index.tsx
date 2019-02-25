import React from 'react'
import ReactDOM from 'react-dom'
import { PositionProvider } from './PositionContext'
import Cards from './Cards'
import { Meal } from './types'
import { MealProvider } from './MealPlanContext'

const meals: Meal[] = [
	{ id: '1', name: 'First Item' },
	{ id: '2', name: 'Second Item' },
	{ id: '3', name: 'Third Item' },
	{ id: '4', name: 'Fourth Item' },
	{ id: '5', name: 'Fifth Item' },
	{ id: '6', name: 'Sixth Item' },
	{ id: '7', name: 'Seventh Item' }
]

const App = () => {
	return (
		<MealProvider meals={meals}>
			<PositionProvider initialItems={meals}>
				<Cards />
			</PositionProvider>
		</MealProvider>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
