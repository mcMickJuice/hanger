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
	const url = '/meals'
	const result = await Axios.get<MealTableResponse>(url)

	const meals: Meal[] = result.data.records.map(r => {
		const { id, ...rest } = r.fields
		return {
			...rest,
			id: r.id
		}
	})

	return meals
}
