import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Query, Mutation } from 'react-apollo'
import { GET_MEAL_PLAN, GetMealPlanQueryType, GetMealPlanVariableType } from '../../shared/queries/get_meal_plan'
import { DELETE_MEAL_PLAN, DeleteMealPlanQueryType, DeleteMealPlanVariableType } from '../../shared/queries/delete_meal_plan'
import Meal from '../MealSelect/Meal'
import { GET_MEAL_PLANS } from '../../shared/queries/get_meal_plans'

const MealPlanPage = ({ match, history }: RouteComponentProps<{ planId: string }>) => {
  const { planId } = match.params

  async function handleDeletePlan() {
    // history.replace('/')
  }

  return (
    <div>
      <h1>Meal Plan</h1>

      <Query<GetMealPlanQueryType, GetMealPlanVariableType>
        query={GET_MEAL_PLAN}
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
            return (
              <div>
                <h2>Meal - {data.mealPlan.planName}</h2>
                {data.mealPlan.meals.map(meal => (
                  <div style={{ marginBottom: '8px' }} key={meal.id}>
                    <Meal id={meal.id} name={meal.mealName} />
                  </div>
                ))}
              </div>
            )
          }
        }}
      </Query>

      <Mutation<DeleteMealPlanQueryType, DeleteMealPlanVariableType>
        mutation={DELETE_MEAL_PLAN}
        variables={{
          mealPlanId: planId,
        }}
        onCompleted={() => history.replace('/plan')}
        refetchQueries={[{ query: GET_MEAL_PLAN, variables: { mealPlanId: planId } }, { query: GET_MEAL_PLANS }]}
      >
        {deleteMealPlan => (
          <Button onClick={() => deleteMealPlan()} style={{ marginTop: '16px' }} fullWidth variant="outlined">
            Delete Plan
          </Button>
        )}
      </Mutation>
    </div>
  )
}

export default MealPlanPage
