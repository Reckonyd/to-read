const fetchData = async (
  functionURL: string,
  pageURL: string,
  waitUntil: string,
): Promise<Response> =>
  fetch(functionURL, {
    credentials: 'same-origin',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: pageURL, waitUntil }),
  })

export default fetchData
