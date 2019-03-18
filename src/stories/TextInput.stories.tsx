import React from 'react'
import { storiesOf } from '@storybook/react'

import TextInput from '../shared/TextInput'

storiesOf('TextInput', module)
	.add('default', () => (
		<TextInput
			name="default"
			value="Hello"
			label="Default Input"
			onChange={() => void 0}
		/>
	))
	.add('autofocus', () => (
		<TextInput
			name="autofocus"
			value="I'm focused"
			label="Focused input"
			autofocus
			onChange={() => void 0}
		/>
	))
