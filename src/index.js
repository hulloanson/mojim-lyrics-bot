import { search, } from './lib'

const term = process.argv.slice(2).join(' ').trim()

if (term === '') {
    throw new Error('Missing search term')
}

search(term)
