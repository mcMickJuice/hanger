import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { MealPlan, Meal as MealType } from '../../types'
import Button from '@material-ui/core/Button'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'

// ugh do we not have types on client?
type MealPlanHydrated = Pick<MealPlan, 'id' | 'planName'> & {
  meals: MealType[]
}

interface QueryShape {
  id: string
  planName: string
  numberOfMeals: number
  meals: {
    mealName: string
    id: string
  }[]
}

const query = gql`
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

const MealPlanPage = ({ match, history }: RouteComponentProps<{ planId: string }>) => {
  const { planId } = match.params
  // const [state, dispatch] = React.useReducer(reducer, {
  // 	type: PageStateType.Initial
  // })

  async function handleDeletePlan() {
    // history.replace('/')
  }

  return (
    <div>
      <h1>Meal Plan</h1>

      <Query<{ mealPlan: QueryShape }, { mealPlanId: string }>
        query={query}
        variables={{
          mealPlanId: planId,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Plan in Loading</div>
          } else if (error) {
            return <div>There was an error getting plan</div>
          } else if (data == null) {
            return <div>No Plan found</div>
          } else {
            console.log(data)
            return (
              <div>
                <h2>Meal - {data.mealPlan.planName}</h2>
                {/* {data.mealPlan.meals.map(meal => (
                  <div style={{ marginBottom: '8px' }} key={meal.id}>
                    <Meal meal={meal} />
                  </div>
                ))} */}
              </div>
            )
          }
        }}
      </Query>

      <Button onClick={handleDeletePlan} style={{ marginTop: '16px' }} fullWidth variant="outlined">
        Delete Plan
      </Button>
    </div>
  )
}

export default MealPlanPage
