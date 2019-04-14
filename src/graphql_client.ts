import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
	uri: '/.netlify/functions/graphql'
})

export default client
