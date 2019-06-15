const { gql } = require('apollo-server-lambda')

const typeDefs = gql`
  type Query {
    meals(filter: MealFilter, limit: Int): [Meal!]!
    mealPlans: [MealPlan!]!
    mealPlan(mealPlanId: String!): MealPlan
    meal(mealId: ID!): Meal
  }

  type Mutation {
    createMealPlan(planName: String!, mealIds: [String!]!): MealPlan
  }

  input MealFilter {
    filterType: FilterType
    ids: [ID!]
  }

  enum FilterType {
    INCLUDE
    EXCLUDE
  }

  type Meal {
    id: ID!
    mealName: String!
    persuasion: Persuasion!
    protein: Protein!
    health: Health!
  }

  type MealPlan {
    id: ID!
    planName: String!
    numberOfMeals: Int!
    meals: [Meal!]!
  }

  enum Persuasion {
    ITALIAN
    ASIAN
    COMFORT
    TEXMEX
    INDIAN
    MEDITERRANEAN
    VEGETARIAN
  }

  enum Protein {
    PORK
    CHICKEN
    VEGETARIAN
    FLEXIBLE
    BEEF
    SEAFOOD
  }

  enum Health {
    EVERYDAY
    SPLURGE
    HEALTHY
  }
`

module.exports = typeDefs
