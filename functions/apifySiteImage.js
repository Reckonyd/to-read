const axios = require('axios')

exports.handler = async (event, context, callback) => {
  const APIFY_API =
    'https://api.apify.com/v2/acts/htanoo~scraper-for-toread-image/run-sync?token=6RJWdmGAhtNzaz8cXWvdpeYpx'

  try {
    let response = await axios({
      method: 'post',
      url: APIFY_API,
      data: { url: event.body, width: 1366, height: 768 },
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
