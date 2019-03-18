import { configure } from '@storybook/react'

const req = require.context('../src/stories', true, /.stories.tsx$/)
function loadStories() {
	req.keys().forEach(fileName => req(fileName))
}

configure(loadStories, module)
