/* eslint-disable @typescript-eslint/no-var-requires */
// No need to import puppeteer or puppeteer core
// because chrome-aws-lambda chooses between the two
// based on development or production respectively.
const chromium = require('chrome-aws-lambda')
const { PuppeteerBlocker } = require('@cliqz/adblocker-puppeteer')
const fetch = require('cross-fetch')

exports.handler = async (event, _context) => {
  // Browser handle
  let browser = null

  let image_url = ''

  // Begin Web Sraping
  try {
    // Launch puppeteer default chromium arguments.
    // except viewport (1366x768) for screenshot purpose.
    console.log('Launching Puppeteer...')
    browser = await chromium.puppeteer.launch({
      executablePath: process.env.NETLIFY_DEV
        ? null
        : await chromium.executablePath,
      args: chromium.args,
      defaultViewport: { width: 1366, height: 768 },
      headless: chromium.headless,
    })

    // Open user requested page.
    console.log('Opening:', event.body)
    const page = await browser.newPage()

    // Intercept any ads.
    PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then(blocker =>
      blocker.enableBlockingInPage(page),
    )

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
  } finally {
    if (browser !== null) {
      console.log('Closing Puppeteer...')
      await browser.close()
    }
  }

  return {
    statusCode: 200,
    body: image_url,
  }
}
