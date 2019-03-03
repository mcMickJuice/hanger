const Axios = require('axios')
const { apiKey } = require('./api_config')

const config = {
	headers: { Authorization: `Bearer ${apiKey}` }
}

module.exports.get = url => Axios.get(url, config)
