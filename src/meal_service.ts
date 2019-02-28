import Axios from 'axios'
import { Meal, Health, Persuasion, Protein } from './types'

interface MealTableResponse {
	records: Array<{
		fields: {
			health: Health
			mealName: string
			persuasion: Persuasion
			protein: Protein
			id: number
		}
		id: string
	}>
}

export async function fetchMeals(): Promise<Meal[]> {
	const url = '/.netlify/functions/meals'
	const result = await Axios.get<Meal[]>(url)

	return result.data
}
