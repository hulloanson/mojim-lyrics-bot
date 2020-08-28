const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

const parseResult = (rawHtml) => {
  const root = parse(rawHtml)
  const resultContainer = root.querySelector('.mxsh_dl0')
  const childNodes = resultContainer.childNodes
  for (const n of childNodes) {
    if (n.classNames
      && n.classNames.some(t => t.match(/^mxsh_dd(1|2)$/))
    ) {
      const lyricsPointer = n.querySelector('.mxsh_ss3')
      const linkElem = lyricsPointer && lyricsPointer.querySelector('a')
      console.log('============link elem =================')
      console.log(linkElem)
      const link = linkElem && linkElem.getAttribute('href')
      console.log('============link=================')
      console.log(link)
      const id = parseId(link)
      const songLink = genSongLink(id)
      console.log(songLink)
      break
    }
  }
}

const parseId = (href) => {
  return Array.from(href.matchAll(/[0-9]{6}x[0-9]{2}x[0-9]/))[0][0]
}

const genSongLink = (id) => `http://mojim.com/twy${id}.htm`

const search = (text) => {
  const uriEncoded = encodeURI(text)
  const searchUrl = `http://mojim.com/${uriEncoded}.html`
  fetch(searchUrl)
    .then(res => res.text())
    .then(parseResult)
    .catch(err => {
      console.log('======err=======\n', err)
    })
}

search("缺口 庾澄慶")