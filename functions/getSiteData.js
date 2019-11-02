const chromium = require('chrome-aws-lambda')

exports.handler = async (event, context) => {
  let resObj = {}

  console.log('Launching Puppeteer...')
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  })

  try {
    console.log('Opening:', event.body)
    const page = await browser.newPage()
    await page.goto(event.body, { waitUntil: 'networkidle0' })

    console.log('Setting Viewport...')
    await page.setViewport({ width: 1024, height: 768 })

    console.log('Getting Page Data...')
    const results = await page.evaluate(function() {
      let tempObj = {}

      const extractMetaTitle = () => {
        const title =
          document.querySelector('meta[name="og:title"]') ||
          document.querySelector('meta[name="twitter:title"]')

        return title.getAttribute('content')
      }

      try {
        tempObj.title = extractMetaTitle()
      } catch (err) {
        tempObj.title = document.querySelector('title').innerText
      }

      const extractMetaDesc = () => {
        const description =
          document.querySelector('meta[property="og:description"]') ||
          document.querySelector('meta[name="twitter:description"]') ||
          document.querySelector('meta[name="description"]')

        return description.getAttribute('content')
      }

      try {
        tempObj.description = extractMetaDesc()
      } catch (err) {
        tempObj.description = ''
      }

      const extractMetaImage = () => {
        const image_url =
          document.querySelector('meta[property="og:image"]') ||
          document.querySelector('meta[property="og:image:secure_url"]') ||
          document.querySelector('meta[property="og:image:url"]') ||
          document.querySelector('meta[name="twitter:image"]') ||
          document.querySelector('meta[name="twitter:image:src"]')

        return image_url.getAttribute('content')
      }

      try {
        tempObj.image_url = extractMetaImage()
      } catch (err) {
        tempObj.image_url = ''
      }

      const extractMetaImageAlt = () => {
        const image_alt =
          document.querySelector('meta[property="og:image:alt"]') ||
          document.querySelector('meta[name="twitter:image:alt"]')

        return image_alt.getAttribute('content')
      }

      try {
        tempObj.image_alt = extractMetaImageAlt()
      } catch (err) {
        tempObj.image_alt = ''
      }

      return tempObj
    })

    resObj = results

    if (resObj.image_url === '') {
      const screenshotBuffer = await page.screenshot({
        type: 'jpeg',
        quality: 90,
        encoding: 'base64',
      })
      resObj.image_url = screenshotBuffer
      resObj.encoded = true
      console.log('Saved to base64...')
    }
  } catch (err) {
    console.log('ERROR:', err)
    resObj = {
      notFound: true,
    }
  }

  console.log('Closing Puppeteer...')
  await browser.close()

  return {
    statusCode: 200,
    body: JSON.stringify(resObj),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
