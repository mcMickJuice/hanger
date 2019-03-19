import Axios from 'axios'
import { Meal, MealPlan } from './types'
import { generateUuid } from './uuid_service'
import { setItem, getItem, getListFromPrefix, removeItem } from './storage'

function partition<T>(
	collection: T[],
	condition: (item: T) => boolean
): [T[], T[]] {
	const unFound: T[] = []
	const found: T[] = []
	collection.forEach(item => {
		if (condition(item)) {
			found.push(item)
		} else {
			unFound.push(item)
		}
	})

	return [found, unFound]
}

const cache: {
	[mealId: string]: Meal
} = {}

function cacheMeal(meal: Meal) {
	cache[meal.id] = meal
}

function getMealFromCache(mealId: string): Meal | undefined {
	return cache[mealId]
}

const baseUrl = '/.netlify/functions'

export async function fetchMeals(): Promise<Meal[]> {
	const url = `${baseUrl}/meals`
	const result = await Axios.get<Meal[]>(url)

	// TODO: cache this ish?

	return result.data
}

export async function fetchMealSuggestions(
	limit: number,
	excludeMealIds: string[]
): Promise<string[]> {
	const meals = await fetchMeals()

	const suggestedMeals = meals
		// TODO: should we have this logic of filtering and randomizing on the server?
		.filter(meal => !excludeMealIds.includes(meal.id))
		.sort(() => (Math.random() > 0.5 ? 1 : -1))
		.slice(0, limit)

	suggestedMeals.forEach(meal => cacheMeal(meal))

	return suggestedMeals.map(meal => meal.id)
}

export async function getMealById(mealId: string): Promise<Meal> {
	const foundMeal = getMealFromCache(mealId)

	if (foundMeal != null) {
		return foundMeal
	}

	const url = `${baseUrl}/mealById?mealId=${mealId}`
	const result = await Axios.get<Meal>(url)
	const meal = result.data
	cache[mealId] = meal

	return meal
}

export async function getMealsById(mealIds: string[]): Promise<Meal[]> {
	const [foundIds, notFoundIds] = partition(mealIds, id => cache[id] != null)

	const foundMeals = foundIds.map(id => {
		// these are in the cache, don't worry
		return getMealFromCache(id) as Meal
	})

	if (notFoundIds.length === 0) {
		return foundMeals
	}

	const mealIdsParams = notFoundIds.map(id => `mealIds=${id}`).join('&')

	const url = `${baseUrl}/meals?${mealIdsParams}`
	const response = await Axios.get<Meal[]>(url)

	const fetchedMeals = response.data

	fetchedMeals.forEach(meal => cacheMeal(meal))

	return [...foundMeals, ...fetchedMeals]
}

const MEAL_PLAN_KEY_PREFIX = 'mealplan'
export async function savePlan(newMeal: Omit<MealPlan, 'id'>): Promise<string> {
	const newId = generateUuid()
	const meal: MealPlan = {
		...newMeal,
		id: newId
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
