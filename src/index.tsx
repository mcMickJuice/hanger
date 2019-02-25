import React from 'react'
import ReactDOM from 'react-dom'
import { PositionProvider } from './PositionContext'
import Cards from './Cards'

const items = [
	{ id: '1', text: 'First Item' },
	{ id: '2', text: 'Second Item' },
	{ id: '3', text: 'Third Item' },
	{ id: '4', text: 'Fourth Item' },
	{ id: '5', text: 'Fifth Item' },
	{ id: '6', text: 'Sixth Item' },
	{ id: '7', text: 'Seventh Item' }
]

const App = () => {
	return (
		<PositionProvider initialItems={items}>
			<Cards />
		</PositionProvider>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
