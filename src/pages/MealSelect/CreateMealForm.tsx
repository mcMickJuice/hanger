import React from 'react'
import { savePlan } from '../../meal_service'

interface Props {
	onMealCreated: (mealId: string) => void
	mealIds: string[]
}

const CreateMealPlanForm = ({ onMealCreated, mealIds }: Props) => {
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [mealPlanName, updateMealPlanName] = React.useState('')

	React.useEffect(() => {
		if (inputRef.current != null) {
			inputRef.current.focus()
		}
	}, [])

	async function handleCreateMealPlan() {
		const mealPlanId = await savePlan({
			mealIds,
			planName: mealPlanName
		})

		onMealCreated(mealPlanId)
	}

	return (
		<div>
			<label htmlFor="meal-plan-name">Meal Plan Name</label>
			<input
				ref={inputRef}
				value={mealPlanName}
				onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
					updateMealPlanName(evt.target.value)
				}
				name="meal-plan-name"
			/>

			<button disabled={mealPlanName.length < 5} onClick={handleCreateMealPlan}>
				Create Meal
			</button>
		</div>
	)
}

export default CreateMealPlanForm
