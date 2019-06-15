import React from 'react'

import Button from '@material-ui/core/Button'
import TextInput from '../../shared/TextInput'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { GET_MEAL_PLANS } from '../../shared/queries/get_meal_plans'

interface Props {
  onMealCreated: (mealId: string) => void
  mealIds: string[]
}

const CREATE_MEAL_PLAN = gql`
  mutation CreateMealPlan($newMealPlan: NewMealPlanInput!) {
    createMealPlan(newMealPlan: $newMealPlan) {
      id
      planName
      numberOfMeals
      meals {
        mealName
        persuasion
      }
    }
  }
`

const CreateMealPlanForm = ({ onMealCreated, mealIds }: Props) => {
  const [mealPlanName, updateMealPlanName] = React.useState('')

  return (
    <Mutation
      mutation={CREATE_MEAL_PLAN}
      variables={{
        newMealPlan: {
          planName: mealPlanName,
          mealIds,
        },
      }}
      refetchQueries={[{ query: GET_MEAL_PLANS }]}
      onCompleted={data => {
        onMealCreated(data.createMealPlan.id)
      }}
    >
      {createMealPlan => (
        <div>
          <TextInput onChange={updateMealPlanName} value={mealPlanName} label="Meal Plan Name" autofocus name="meal-plan-name" />

          <Button disabled={mealPlanName.length < 5} onClick={() => createMealPlan()}>
            Create Meal
          </Button>
        </div>
      )}
    </Mutation>
  )
}

export default CreateMealPlanForm
