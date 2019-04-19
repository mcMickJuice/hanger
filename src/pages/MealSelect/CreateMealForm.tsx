import React from 'react'

import Button from '@material-ui/core/Button'
import TextInput from '../../shared/TextInput'

interface Props {
  onMealCreated: (mealId: string) => void
  mealIds: string[]
}

const CreateMealPlanForm = ({ onMealCreated, mealIds }: Props) => {
  const [mealPlanName, updateMealPlanName] = React.useState('')

  async function handleCreateMealPlan() {
    // const mealPlanId = await savePlan({
    //   mealIds,
    //   planName: mealPlanName,
    // })
    // onMealCreated(mealPlanId)
  }

  return (
    <div>
      <TextInput onChange={updateMealPlanName} value={mealPlanName} label="Meal Plan Name" autofocus name="meal-plan-name" />

      <Button disabled={mealPlanName.length < 5} onClick={handleCreateMealPlan}>
        Create Meal
      </Button>
    </div>
  )
}

export default CreateMealPlanForm
