const Axios = require('axios')

const apiKey = process.env.AIR_TABLE_API_KEY
const mealsTableUrl = process.env.MEALS_TABLE_URL

const config = {
	headers: { Authorization: `Bearer ${apiKey}` }
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
