const axios = require('axios')

exports.handler = async (event, context, callback) => {
  const APIFY_API = process.env.API_SITE_INFO_URL + process.env.API_KEY

  try {
    let response = await axios({
      method: 'post',
      url: APIFY_API,
      data: { url: event.body },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 404,
      body: err,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
}
