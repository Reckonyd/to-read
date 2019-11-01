const axios = require('axios')

exports.handler = async (event, context, callback) => {
  const APIFY_API = process.env.API_IMG_URL + process.env.API_KEY

  try {
    let response = await axios({
      method: 'post',
      url: APIFY_API,
      data: { url: event.body, width: 1366, height: 768 },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response.data),
    })
  } catch (err) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(err),
    })
  }
}
