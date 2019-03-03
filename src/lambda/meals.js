const { get } = require('./http_client')
const { mealsTableUrl } = require('./api_config')

export function handler(_, __, callback) {
	get(mealsTableUrl).then(result => {
		const meals = result.data.records.map(r => {
			const { id, ...rest } = r.fields
			return {
				...rest,
				id: r.id
			}
		})

		callback(null, {
			statusCode: 200,
			body: JSON.stringify(meals)
		})
	})
}
