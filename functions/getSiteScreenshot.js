const chromium = require('chrome-aws-lambda')

const blockedResources = [
  'quantserve',
  'adzerk',
  'doubleclick',
  'adition',
  'exelator',
  'sharethrough',
  'twitter',
  'google-analytics',
  'fontawesome',
  'facebook',
  'analytics',
  'optimizely',
  'clicktale',
  'mixpanel',
  'zedo',
  'clicksor',
  'tiqcdn',
  'googlesyndication',
]

exports.handler = async (event, context) => {
  let image_url = ''

  console.log('Launching Puppeteer...')
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: { width: 1366, height: 768 },
    headless: chromium.headless,
  })

  try {
    console.log('Opening:', event.body)
    const page = await browser.newPage()

    await page.setRequestInterception(true)

    page.on('request', request => {
      if (
        blockedResources.some(
          resource => request.url().indexOf(resource) !== -1,
        )
      ) {
        console.log('Aborted')
        request.abort()
      } else {
        request.continue()
      }
    })

    await page.goto(event.body, { waitUntil: 'networkidle2' })

    console.log('Getting Page Image...')
    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 90,
      encoding: 'base64',
    })

    image_url = screenshotBuffer
    console.log('Saved to base64...')
  } catch (err) {
    console.log('ERROR:', err)
    image_url = ''
  }

  console.log('Closing Puppeteer...')
  await browser.close()

  return {
    statusCode: 200,
    body: image_url,
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    // },
  }
}
