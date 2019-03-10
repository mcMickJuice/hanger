import React from 'react'
import { MealPlan } from '../../types'
import Button from '../../shared/Button'

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
	const inputRef = React.useRef<HTMLTextAreaElement>(null)
	const url = encodeMealPlanIntoUrl(mealPlan)

	function handleCopy() {
		if (inputRef.current != null) {
			inputRef.current.select()
			document.execCommand('copy')
		}
	}

	return (
		<div>
			<Button onClick={handleCopy}>Copy Share Url</Button>
			<textarea readOnly value={url} ref={inputRef} />
		</div>
	)
}

export default ShareMealPlan
