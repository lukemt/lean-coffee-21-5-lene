const express = require('express')
const { nanoid } = require('nanoid')

const router = express.Router()

let cards = [
  {
    text: 'What is MongoDB?',
    author: 'John Doe',
    id: '1234abc',
  },
  {
    text: 'What is Node.js?',
    author: 'Jane Doe',
    id: '123abcd',
  },
]

router.get('/', (request, response) => {
  response.status(200).json(cards)
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  // const params = request.params // { id: '1234abc' }
  // const id = params.id // '1234abc'

  const card = cards.find(card => card.id === id)
  // card === undefined: falsy
  // card === {...}: truthy
  if (card) {
    response.status(200).json(card)
  } else {
    const error = { message: 'Could not find object with that id.' }
    response.status(404).json(error)
  }

  // if(!card) {
  //   const error = { message: 'Could not find object with that id.' }
  //   return response.status(404).json(error)
  // }

  // return response.status(200).json(card)
})

router.post('/', (request, response) => {
  const { text, author } = request.body // { text: "What is node?", author: "Max M." }

  if (text === '' || author === '') {
    const error = { message: 'Information missing.' }
    return response.status(400).json(error) // Bad Request
  }

  const newCard = { text, author, id: nanoid() } // { text: text, author: author, id: nanoid() }
  cards = [...cards, newCard]
  // cards.push(newCard)
  response.status(200).json(newCard)
})

router.put('/:id', (request, response) => {
  const params = request.params
  console.log(params)
  response.send('This was a PUT request')
})

router.patch('/:id', (request, response) => {
  response.send('This was a PATCH request')
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const card = cards.find(card => card.id === id)

  if (card) {
    cards = cards.filter(card => card.id !== id)
    response.status(200).json(card)
  } else {
    const error = { message: 'Could not find object with that id.' }
    response.status(404).json(error)
  }
})

module.exports = router
