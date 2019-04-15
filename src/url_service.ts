import Axios from 'axios'

const baseUrl = '/.netlify/functions'

export async function getShortUrl(url: string): Promise<string> {
  let urlToShorten = url
  if (url.includes('localhost')) {
    // bitly doesnt work with localhost so we need to replace it
    //eslint-disable-next-line no-restricted-globals
    urlToShorten = urlToShorten.replace(location.origin, 'https://hanger.netlify.com')
  }
  const shortenUrl = `${baseUrl}/urlShorten`

  const response = await Axios.post<{
    shortenedUrl: string
  }>(shortenUrl, {
    url: urlToShorten,
  })

  return response.data.shortenedUrl
}
