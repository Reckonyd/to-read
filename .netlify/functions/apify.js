const axios = require('axios')

exports.handler = async (event, context, callback) => {

  let APIFY_API = process.env.API_URL + process.env.API_KEY

  callback(null, {statusCode: 200, body: JSON.stringify(APIFY_API)})
}