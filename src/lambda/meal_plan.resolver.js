const MealPlanResolver = {
  numberOfMeals: parent => {
    return parent.mealIds.length
  },
  meals: (parent, _, context) => {
    return parent.mealIds.map(id => context.dataSources.mealApi.getMealById(id))
  },
}

module.exports = MealPlanResolver
