const { ApolloServer, gql } = require('apollo-server-lambda')
const MealService = require('./meal_service')

const typeDefs = gql`
	type Query {
		meals(filter: MealFilter): [Meal!]!
		mealPlans: [MealPlan!]!
		mealPlan(mealPlanId: String!): MealPlan
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
	}

	enum Protein {
		PORK
		CHICKEN
		VEGETARIAN
		FLEXIBLE
		BEEF
	}

	enum Health {
		EVERYDAY
		SPLURGE
		HEALTHY
	}
`

const resolvers = {
	Query: {
		meals: (_, { filter }, context) => {
			return context.dataSources.mealApi.getMealsWithFilter(
				filter.ids,
				filter.filterType === 'INCLUDE'
			)
		},
		mealPlans: (_, __, context) => {
			return context.dataSources.mealApi.getMealPlans()
		},
		mealPlan: (_, { mealPlanId }, context) => {
			return context.dataSources.mealApi.getMealPlanById(mealPlanId)
		}
	},
	MealPlan: {
		numberOfMeals: (parent, _) => {
			return parent.mealIds.length
		},
		meals: (parent, _, context) => {
			console.log(parent.mealIds)
			return parent.mealIds.map(id =>
				context.dataSources.mealApi.getMealById(id)
			)
		}
	},
	Persuasion: {
		ITALIAN: 'Italian',
		ASIAN: 'Asian',
		COMFORT: 'Comfort',
		TEXMEX: 'TexMex',
		INDIAN: 'Indian'
	},

	Health: {
		EVERYDAY: 'Everyday',
		SPLURGE: 'Splurge',
		HEALTHY: 'Healthy'
	},

	Protein: {
		PORK: 'Pork',
		CHICKEN: 'Chicken',
		VEGETARIAN: 'Vegetarian',
		FLEXIBLE: 'Flexible',
		BEEF: 'Beef'
	}
}

const server = new ApolloServer({
	introspection: true,
	playground: true,
	typeDefs,
	resolvers,
	dataSources: () => {
		return {
			mealApi: new MealService()
		}
	}
})

exports.handler = server.createHandler()
