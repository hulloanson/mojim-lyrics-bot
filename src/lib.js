import fetch from 'node-fetch'
import cheerio from 'cheerio'
import TurndownService from 'turndown'

const getFirstLinkFromResults = (rawHtml) => {
  const $ = cheerio.load(rawHtml)
  const res = $('.mxsh_ss3 > a')
  console.log('======res=====')
  console.log(res)
  const uri = res.length > 0 && res[0] && res[0].attribs && res[0].attribs['href']
  console.log('======uri=====')
  console.log(uri)
  const id = uri && parseId(uri)
  console.log('======id=====')
  console.log(id)
  const link = id && genSongLink(id)
  console.log('======link=====')
  console.log(link)
  return link
}

const parseLyrics = (rawHtml) => {
  const $ = cheerio.load(rawHtml, { decodeEntities: false, })
  const lyricsMarkdown = (new TurndownService()).turndown($('#fsZx3').html())
  return lyricsMarkdown
}

const removeTimeStampedLyrics = (str) => {
  return str.replace(/\\\[.*\\\].*\n/g, '')
}
const removeEmptyLines = (str) => {
  return str.replace(/\n\s*\n/g, '\n\n')
}

const parseId = (href) => {
  const matches = Array.from(href.matchAll(/[0-9]+x[0-9]+x[0-9]+/))
  return matches && matches[0] && matches[0][0]
}

const genSongLink = (id) => `http://mojim.com/twy${id}.htm`

export const search = (text) => {
  const uriEncoded = encodeURI(text)
  const searchUrl = `http://mojim.com/${uriEncoded}.html`
  fetch(searchUrl)
    .then(res => res.text())
    .then(getFirstLinkFromResults)
    .then(link => {
      if (!link) throw new Error('no link found')
      return link
    })
    .then(link => fetch(link))
    .then(res => res.text())
    .then(parseLyrics)
    .then(removeTimeStampedLyrics)
    .then(removeEmptyLines)
    .then(res => console.log(res))
    .catch(err => {
      console.log('======err=======\n', err)
    })
}