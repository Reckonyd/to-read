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

    await page.goto(event.body, { waitUntil: 'networkidle0' })

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
  }
}
