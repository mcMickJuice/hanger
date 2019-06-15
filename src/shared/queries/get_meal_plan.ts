import gql from 'graphql-tag'

export const GET_MEAL_PLAN = gql`
  query MealPlanQuery($mealPlanId: String!) {
    mealPlan(mealPlanId: $mealPlanId) {
      id
      planName
      numberOfMeals
      meals {
        mealName
        id
      }
    }
  }
`

export interface GetMealPlanQueryType {
  mealPlan: {
    id: string
    planName: string
    numberOfMeals: number
    meals: {
      mealName: string
      id: string
    }[]
  }
}

export interface GetMealPlanVariableType {
  mealPlanId: string
}
