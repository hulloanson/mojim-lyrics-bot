const fetch = require('node-fetch')
// const { parse, } = require('node-html-parser')
const cheerio = require('cheerio')
const TurndownService = require('turndown')

const parseLinkFromResultNode = (node) => {
  const lyricsPointer = node.querySelector('.mxsh_ss3')
  const linkElem = lyricsPointer && lyricsPointer.querySelector('a')
  console.log('============link elem =================')
  console.log(linkElem)
  const link = linkElem && linkElem.getAttribute('href')
  console.log('============link=================')
  console.log(link)
  const id = link && parseId(link)
  const songLink = id && genSongLink(id)
  return songLink
}

const findFirstResult = (resultContainer) => {
  return resultContainer.childNodes &&
    resultContainer.childNodes.find(n =>
      n.classNames && n.classNames.find(
        cn => cn.match(/mxsh_dd(1|2)/))
    )
}

const getFirstLinkFromResults = (rawHtml) => {
  const $ = cheerio.load(rawHtml)
  const oddRes = $('.mxsh_dd1')
  const evenRes = $('.mxsh_dd2')
  const len = Math.max(oddRes.length, evenRes.length)
  let res = []
  for (let i = 0; i < len; i++) {
    res[2*i] = oddRes[i]
    res[2*i + 1] = evenRes[i]
  }
  console.log(res)
  throw new Error('exit')
  console.log('==============oddRes======================')
  console.log(Array.from(oddRes))
  console.log('==============evenRes======================')
  console.log(Array.from(evenRes))
  return parseLinkFromResultNode(firstRes)
  // if (!childNodes || childNodes.length === 0) return null
  // return parseResult(childNodes[0])
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
  const matches = Array.from(href.matchAll(/[0-9]{6}x[0-9]{2}x[0-9]/))
  return matches && matches[0] && matches[0][0]
}

const genSongLink = (id) => `http://mojim.com/twy${id}.htm`

const search = (text) => {
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

search('晚期拖延症患者')