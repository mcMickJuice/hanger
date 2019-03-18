import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import BigLink from '../shared/BigLink'

storiesOf('BigLink', module)
	.addDecorator(children => <MemoryRouter>{children()}</MemoryRouter>)
	.add('BigLink', () => <BigLink to="/somewhere">BIG LINK</BigLink>)
