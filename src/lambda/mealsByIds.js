const Axios = require('axios')
const { mealsTableUrl, airTableApiKey } = require('./api_config')

const config = {
	headers: { Authorization: `Bearer ${airTableApiKey}` }
}

export function handler(event, __, callback) {
	const mealIds = event.queryStringParameters.mealIds

	if (mealIds == null || mealIds.length === 0) {
		callback(null, {
			statusCode: 400,
			body: JSON.stringify({ message: 'mealIds not provided' })
		})
		return
	}

	// we're going to cheat and fetch all meals then filter accordingly
	// TODO: accommodate for pagination
	Axios.get(mealsTableUrl, config)
		.then(
			result => {
				const meals = result.data.records
					.map(r => {
						const { id, ...rest } = r.fields
						return {
							...rest,
							id: r.id
						}
					})
					.filter(meal => mealIds.includes(meal.id))

				callback(null, {
					statusCode: 200,
					body: JSON.stringify(meals)
				})
			},
			e => {
				callback(null, {
					statusCode: e.response.status,
					body: JSON.stringify({ message: e.response.statusText })
				})
			}
		)
		.catch(e => {
			callback(null, {
				statusCode: 500,
				body: JSON.stringify({
					message: e.message
				})
			})
		})
}
