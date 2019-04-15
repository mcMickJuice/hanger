import React from 'react'
import { Meal } from '../types'
import { getMealById } from '../meal_service'

function useMeal(
  mealId: string,
): {
  meal: Meal | undefined
} {
  const [currentMeal, updateCurrentMeal] = React.useState<Meal | undefined>(undefined)

  async function fetchMealById(mealIdToFetch: string) {
    const meal = await getMealById(mealIdToFetch)

    updateCurrentMeal(meal)
  }

  React.useEffect(() => {
    // why cant we have async functions passed to use effect?
    // https://github.com/facebook/react/pull/14069
    fetchMealById(mealId)
  }, [mealId])

  return {
    meal: currentMeal,
  }
}

interface MealChipProps {
  mealId: string
}

const MealChip = ({ mealId }: MealChipProps) => {
  const { meal } = useMeal(mealId)

  return meal == null ? null : <div>{meal.mealName}</div>
}

export default MealChip
