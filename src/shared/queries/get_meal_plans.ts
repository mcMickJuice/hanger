import gql from 'graphql-tag'

export const GET_MEAL_PLANS = gql`
  {
    mealPlans {
      id
      planName
      numberOfMeals
    }
  }
`

export interface GetMealPlansQueryType {
  mealPlans: {
    id: string
    planName: string
    numberOfMeals: number
  }[]
}
