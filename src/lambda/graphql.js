const { ApolloServer } = require('apollo-server-lambda')
const MealService = require('./meal_service')
const typeDefs = require('./schema')
const MutationResolver = require('./mutation.resolver')
const QueryResolver = require('./query.resolver')
const MealPlanResolver = require('./meal_plan.resolver')
const EnumResolvers = require('./enum.resolver')

const resolvers = {
  Query: QueryResolver,
  Mutation: MutationResolver,
  MealPlan: MealPlanResolver,
  Persuasion: EnumResolvers.Persuasion,
  Health: EnumResolvers.Health,
  Protein: EnumResolvers.Protein,
}

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      mealApi: new MealService(),
    }
  },
})

exports.handler = server.createHandler()
