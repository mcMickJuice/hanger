import React from 'react'
import { MealPlan } from '../../types'
import Button from '@material-ui/core/Button'
import { getShortUrl } from '../../url_service'

interface Props {
	mealPlan: MealPlan
}

function encodeMealPlanIntoUrl(mealPlan: MealPlan) {
	const baseUrl = `${window.location.origin}/plan/share`
	const mealIdsParam = mealPlan.mealIds
		.map(mealId => `mealIds=${mealId}`)
		.join('&')
	const mealPlanIdParam = `mealPlanId=${mealPlan.id}`
	const mealPlanNameParam = `mealPlanName=${mealPlan.planName}`

	return `${baseUrl}?${mealIdsParam}&${mealPlanIdParam}&${mealPlanNameParam}`
}

// get meal plan from storage
// encode that into url

const ShareMealPlan = ({ mealPlan }: Props) => {
	const [showCopyMessage, setShowCopyMessage] = React.useState(false)
	const inputRef = React.useRef<HTMLTextAreaElement>(null)

	async function handleCopy() {
		if (inputRef.current != null) {
			const encodedUrl = encodeMealPlanIntoUrl(mealPlan)
			const shortUrl = await getShortUrl(encodedUrl)
			inputRef.current.value = shortUrl
			inputRef.current.setAttribute('style', 'display: block;')
			inputRef.current.select()
			document.execCommand('copy')
			inputRef.current.setAttribute('style', 'display: none;')

			setShowCopyMessage(true)

			setTimeout(() => {
				setShowCopyMessage(false)
			}, 3000)
		}
	}

	return (
		<div>
			<Button onClick={handleCopy}>
				{showCopyMessage ? 'URL Copied!' : 'Copy Share Url'}
			</Button>
			<textarea
				style={{ display: 'none' }}
				readOnly
				value={''}
				ref={inputRef}
			/>
		</div>
	)
}

export default ShareMealPlan
