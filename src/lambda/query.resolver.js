const QueryResolver = {
  meals: (_, { filter, limit }, context) => {
    return context.dataSources.mealApi.getMealsWithFilter(filter, limit)
  },
  mealPlans: (_, __, context) => {
    return context.dataSources.mealApi.getMealPlans()
  },
  mealPlan: (_, { mealPlanId }, context) => {
    return context.dataSources.mealApi.getMealPlanById(mealPlanId)
  },
  meal: (_, { mealId }, context) => {
    return context.dataSources.mealApi.getMealById(mealId)
  },
}

module.exports = QueryResolver
