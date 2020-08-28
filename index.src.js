const fetch = require('node-fetch')
const { parse } = require('node-html-parser')

const parseResult = (rawHtml) => {
  const root = parse(rawHtml)
  console.log(root.)
}

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

search()