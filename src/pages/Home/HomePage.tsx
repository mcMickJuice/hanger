import React from 'react'
import Typography from '@material-ui/core/Typography'
import ApolloClient, { gql } from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'

const client = new ApolloClient({
	uri: '/.netlify/functions/graphql'
})

const query = gql`
	{
		hello
	}
`

const HomePage = () => {
	return (
		<ApolloProvider client={client}>
			<Query query={query}>
				{({ data }) => {
					console.log(data)

					return <div>{JSON.stringify(data, null, 2)}</div>
				}}
			</Query>
			<div>
				<Typography variant="h2">Hangry?</Typography>

				<Typography variant="body1">
					Welcome to meal plan site! This site is ugly and isn't fully
					functional...but it will be some day!
				</Typography>
			</div>
		</ApolloProvider>
	)
}

export default HomePage
