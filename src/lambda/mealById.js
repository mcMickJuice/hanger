const { get } = require('./http_client')
const { mealsTableUrl } = require('./api_config')

export function handler(event, __, callback) {
	const mealId = event.queryStringParameters.mealId

	if (mealId == null || mealId === '') {
		callback(null, {
			statusCode: 400,
			body: JSON.stringify({ message: 'mealId not provided' })
		})
		return
	}

	const url = `${mealsTableUrl}/${mealId}`
	get(url)
		.then(
			result => {
				const foundMeal = result.data

				const { id, ...rest } = foundMeal.fields
				const mealToReturn = {
					...rest,
					id: foundMeal.id
				}

				callback(null, {
					statusCode: 200,
					body: JSON.stringify(mealToReturn)
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
