import gql from 'graphql-tag'

export const DELETE_MEAL_PLAN = gql`
  mutation DeleteMealPlan($mealPlanId: ID!) {
    deleteMealPlan(mealPlanId: $mealPlanId)
  }
`
export type DeleteMealPlanQueryType = boolean

export interface DeleteMealPlanVariableType {
  mealPlanId: string
}
