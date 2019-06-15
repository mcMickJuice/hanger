const MutatationResolver = {
  createMealPlan: (_, { planName, mealIds }, context) => {
    return context.dataSources.mealApi.createMealPlan(planName, mealIds)
  },
}

module.exports = MutatationResolver
