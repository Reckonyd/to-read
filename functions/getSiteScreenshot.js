const chromium = require('chrome-aws-lambda')

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
    await page.goto(event.body)

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
  }
}
