const axios = require('axios')

exports.handler = async (event, context, callback) => {
  
  let response = await axios({
    method: event.method,
    url: process.env.API_URL + process.env.API_KEY,
    data: {
      url: event.body,
      width: 1366,
      height: 768,
    },
    config: {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    },
  })

  callback(null, response)
}