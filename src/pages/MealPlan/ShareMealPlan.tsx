import React from 'react'
import Button from '@material-ui/core/Button'
interface Props {
	mealPlanId: string
}

function encodeMealPlanIntoUrl(mealPlanId: string) {
	return `${window.location.origin}/plan/${mealPlanId}`
}

const ShareMealPlan = ({ mealPlanId }: Props) => {
	const [showCopyMessage, setShowCopyMessage] = React.useState(false)
	const inputRef = React.useRef<HTMLTextAreaElement>(null)

	async function handleCopy() {
		if (inputRef.current != null) {
			const encodedUrl = encodeMealPlanIntoUrl(mealPlanId)

			inputRef.current.value = encodedUrl
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
			<Button onClick={handleCopy} fullWidth variant="contained">
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
