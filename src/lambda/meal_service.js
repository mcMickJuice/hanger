const { RESTDataSource } = require('apollo-datasource-rest')
const { mealsTableUrl, airTableApiKey } = require('./api_config')

const meals = [
  {
    id: 'id1',
    mealName: 'Meal Name 1',
    persuasion: 'Italian',
    protein: 'Chicken',
    health: 'Healthy',
  },
  {
    id: 'id2',
    mealName: 'Meal Name 2',
    persuasion: 'Italian',
    protein: 'Chicken',
    health: 'Healthy',
  },
  {
    id: 'id3',
    mealName: 'Meal Name 3',
    persuasion: 'Italian',
    protein: 'Chicken',
    health: 'Healthy',
  },
]
const mealPlans = [
  {
    id: 'meal-1',
    planName: 'My Meal Plan',
    mealIds: meals.map(m => m.id),
  },
  {
    id: 'meal-2',
    planName: 'A hearty meal pla ',
    mealIds: ['id3'],
  },
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

const mealPlanCache = {}

class MealService extends RESTDataSource {
  willSendRequest(request) {
    request.headers.set('Authorization', `Bearer ${airTableApiKey}`)
  }
  async getMealsWithFilter(filter, limit) {
    const { ids, filterType } = filter || {}
    const shouldInclude = filterType == null ? true : filterType === 'INCLUDE'
    const response = await this.get(mealsTableUrl)

    const meals = response.records.map(r => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...rest } = r.fields
      return {
        ...rest,
        id: r.id,
      }
    })

    // ugh...this logic
    const [included, excluded] = partition(meals, item => {
      return ids == null || ids.includes(item.id)
    })

    const toReturn = shouldInclude ? included : excluded

    return limit == null ? toReturn : toReturn.slice(0, limit)
  }

  async createMealPlan(planName, mealIds) {
    const newMeal = {
      id: Date.now().toString(),
      planName,
      mealIds,
    }
    mealPlanCache[newMeal.id] = newMeal

    return newMeal
  }

  getMealPlans() {
    return Object.values(mealPlanCache)
  }

  getMealPlanById(mealPlanId) {
    return mealPlanCache[mealPlanId]
  }

  async getMealById(mealId) {
    const url = `${mealsTableUrl}/${mealId}`
    const foundMeal = await this.get(url)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = foundMeal.fields
    const mealToReturn = {
      ...rest,
      id: foundMeal.id,
    }

    return mealToReturn
  }

  deleteMealPlan(mealPlanId) {
    return delete mealPlanCache[mealPlanId]
  }
}

module.exports = MealService
