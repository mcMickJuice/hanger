const Axios = require('axios')
const { mealsTableUrl, airTableApiKey } = require('./api_config')

const config = {
	headers: { Authorization: `Bearer ${airTableApiKey}` }
}

export function handler(_, __, callback) {
	Axios.get(mealsTableUrl, config).then(result => {
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
