import React from 'react'
import { storiesOf } from '@storybook/react'

import Button from '../shared/Button'

storiesOf('Button', module)
	.add('default', () => {
		return <Button>Default Button</Button>
	})
	.add('custom style', () => {
		return (
			<Button
				style={{
					backgroundColor: 'tomato'
				}}
				onClick={() => void 0}
			>
				Cool Style
			</Button>
		)
	})
