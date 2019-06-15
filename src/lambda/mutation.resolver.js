const MutatationResolver = {
  createMealPlan: (_, { newMealPlan }, context) => {
    const { planName, mealIds } = newMealPlan
    return context.dataSources.mealApi.createMealPlan(planName, mealIds)
  },
  deleteMealPlan: (_, { mealPlanId }, context) => {
    return context.dataSources.mealApi.deleteMealPlan(mealPlanId)
  },
}

module.exports = MutatationResolver
