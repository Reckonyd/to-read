// No need to import puppeteer or puppeteer core
// because chrome-aws-lambda chooses between the two
// based on development or production respectively.
const chromium = require('chrome-aws-lambda')

// List of ad domains used on page Interceptor.
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

  // Launch puppeteer default chromium arguments.
  // except viewport (1366x768) for screenshot purpose.
  console.log('Launching Puppeteer...')
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: { width: 1366, height: 768 },
    headless: chromium.headless,
  })

  // Begin Web Sraping
  try {
    // Open user requested page.
    console.log('Opening:', event.body)
    const page = await browser.newPage()

    // Intercept any ads.
    await page.setRequestInterception(true)

    page.on('request', request => {
      if (
        blockedResources.some(
          resource => request.url().indexOf(resource) !== -1,
        )
      ) {
        request.abort()
      } else {
        request.continue()
      }
    })

    // Open user requested page.
    // Networkidle0 means that we wait for the page to load
    // and 0 connections for 500ms.
    await page.goto(event.body, { waitUntil: 'networkidle0' })

    // Take screenshot and save it as a base64 string.
    console.log('Getting Page Image...')
    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 90,
      encoding: 'base64',
    })

    image_url = screenshotBuffer
    console.log('Saved to base64...')
  } catch (err) {
    // Fail silently by setting image to empty string
    console.log('ERROR:', err)
    image_url = ''
  }

  console.log('Closing Puppeteer...')
  await browser.close()

  return {
    statusCode: 200,
    body: image_url,
  }
}
