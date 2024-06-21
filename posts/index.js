const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex')
  const { title } = req.body
  posts[id] = { id, title }
  try {
    await axios.post('http://event-bus-srv:4005/events', { type: 'PostCreated', data: { id, title }})
    console.info('Successfully created post and emitted the event')
  } catch (error) {
    console.error('Error trying to emit the event', error)
  }
  res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
  console.info('Received event with payload', req.body)
  res.status(200).send()
})

app.listen(4000, () => {
  console.log('Posts application v4 listening on port 4000...')
})