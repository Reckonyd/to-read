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
  // Scrape Results Object.
  let resObj = {}
  // Destructure user requested url and wait value.
  const { url, wait } = JSON.parse(event.body)

  // Launch puppeteer default chromium arguments.
  console.log('Launching Puppeteer...')
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  })

  // Begin Web Sraping.
  try {
    // Open user requested page.
    console.log('Opening:', url)
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
    /* Based on the value of wait:
        Networkidle0 means that we wait for the page to load
        and 0 connections for 500ms.
        Domcontentloaded means that we wait for the HTML document to be completely loaded and parsed 
        without waiting for stylesheets, images, and subframes to finish loading.
    */
    await page.goto(url, { waitUntil: wait })

    // Scrape Data - Using Facebook and Twitter meta tags.
    console.log('Getting Page Data...')
    const results = await page.evaluate(function() {
      let tempObj = {}

      // Get title string from meta tags or title tag.
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

      // Get description string from meta tags
      // or set it to empty on failure.
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

      // Get the image url string from meta tags.
      // Using this method we save time from the unnecessary
      // call to getSiteScreenshot.
      // On fail set image url to empty string.
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

      // Get the image alternative text string or set it to empty string.
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

    // Populate Results object.
    resObj = results
  } catch (err) {
    // Fail silently by setting Results object
    // to an object containing the notFound property.
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
