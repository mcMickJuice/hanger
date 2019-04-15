const Axios = require('axios')
const { bitlyApiKey } = require('./api_config')

const config = {
  headers: {
    Authorization: `Bearer ${bitlyApiKey}`,
    'Content-Type': 'application/json',
  },
}

const shortenUrl = 'https://api-ssl.bitly.com/v4/shorten'
export function handler(req, _, callback) {
  const body = JSON.parse(req.body)

  if (body == null || body.url == null || body.url === '') {
    callback(null, {
      statusCode: 400,
      body: 'No Body or url property in request',
    })
  } else {
    Axios.post(
      shortenUrl,
      {
        // eslint-disable-next-line @typescript-eslint/camelcase
        long_url: body.url,
      },
      config,
    )
      .then(resp => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            shortenedUrl: resp.data.link,
          }),
        })
      })
      .catch(err => {
        callback(null, {
          statusCode: 500,
          body: JSON.stringify({
            message: 'An error occurred',
            error: err.message,
          }),
        })
      })
  }

  // get(mealsTableUrl).then(result => {
  // 	const meals = result.data.records.map(r => {
  // 		const { id, ...rest } = r.fields
  // 		return {
  // 			...rest,
  // 			id: r.id
  // 		}
  // 	})

  // 	callback(null, {
  // 		statusCode: 200,
  // 		body: JSON.stringify(meals)
  // 	})
  // })
}
