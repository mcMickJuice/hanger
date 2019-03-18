import React from 'react'
import { storiesOf } from '@storybook/react'
import Nav from '../shared/Nav'
import { MemoryRouter } from 'react-router'

storiesOf('Nav', module)
	.addDecorator(children => {
		// dimensions of pixel 2
		return (
			<div style={{ backgroundColor: 'black' }}>
				<div
					style={{ backgroundColor: 'white', width: '411px', height: '731px' }}
				>
					{children()}
				</div>
			</div>
		)
	})
	.addDecorator(children => <MemoryRouter>{children()}</MemoryRouter>)
	.add('defaut', () => {
		return (
			<Nav>
				<div>Children Stuff</div>
			</Nav>
		)
	})
