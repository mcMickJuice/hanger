const meals = [
	{
		id: 'id1',
		mealName: 'Meal Name 1',
		persuasion: 'Italian',
		protein: 'Chicken',
		health: 'Healthy'
	},
	{
		id: 'id2',
		mealName: 'Meal Name 2',
		persuasion: 'Italian',
		protein: 'Chicken',
		health: 'Healthy'
	},
	{
		id: 'id3',
		mealName: 'Meal Name 3',
		persuasion: 'Italian',
		protein: 'Chicken',
		health: 'Healthy'
	}
]
const mealPlans = [
	{
		id: 'meal-1',
		planName: 'My Meal Plan',
		mealIds: meals.map(m => m.id)
	},
	{
		id: 'meal-2',
		planName: 'A hearty meal pla ',
		mealIds: ['id3']
	}
]

function partition(collection, predicate) {
	const consequent = []
	const alternate = []
	collection.forEach(item => {
		if (predicate(item)) {
			consequent.push(item)
		} else {
			alternate.push(item)
		}
	})

	return [consequent, alternate]
}

class MealService {
	getMealsWithFilter(ids, include) {
		const [included, excluded] = partition(meals, item => {
			return ids.includes(item.id)
		})

		return include ? included : excluded
	}

	getMealPlans() {
		return mealPlans
	}

	getMealPlanById(mealPlanId) {
		return mealPlans.find(plan => plan.id === mealPlanId)
	}

	getMealById(mealId) {
		return meals.find(meal => meal.id === mealId)
	}
}

module.exports = MealService
