import { MealPlan } from './types'
import { generateUuid } from './uuid_service'
import { setItem, getItem, getListFromPrefix, removeItem } from './storage'

const MEAL_PLAN_KEY_PREFIX = 'mealplan'
export async function savePlan(newMeal: Omit<MealPlan, 'id'>): Promise<string> {
  const newId = generateUuid()
  const meal: MealPlan = {
    ...newMeal,
    id: newId,
  }

  const storageKey = `${MEAL_PLAN_KEY_PREFIX}_${newId}`
  setItem(storageKey, meal)

  return newId
}

export async function deletePlan(planId: string): Promise<void> {
  const storageKey = `${MEAL_PLAN_KEY_PREFIX}_${planId}`

  removeItem(storageKey)
}

export async function fetchPlan(planId: string): Promise<MealPlan | null> {
  const storageKey = `${MEAL_PLAN_KEY_PREFIX}_${planId}`
  const foundPlan = getItem<MealPlan>(storageKey)

  return foundPlan
}

export async function getPlans(): Promise<MealPlan[]> {
  const savedPlans = getListFromPrefix<MealPlan>(MEAL_PLAN_KEY_PREFIX)

  return savedPlans
}

export async function storeSharedPlan(mealPlan: MealPlan): Promise<void> {
  const storageKey = `${MEAL_PLAN_KEY_PREFIX}_${mealPlan.id}`

  setItem(storageKey, mealPlan)
}
