const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
  const endpoints = [
    'http://posts-clusterip-srv:4000/events',
    // 'http://localhost:4001/events',
    // 'http://localhost:4002/events',
    // 'http://localhost:4003/events',
  ]
  for(const endpoint of endpoints) {
    console.log(`Sending event to ${endpoint}`, req.body)
    try {
      await axios.post(endpoint, req.body)
      console.info('Successfully sent event')
    }
    catch (error) {
      console.error('Error sending event', error)
    }
  }
  res.status(201).send({})
});

app.listen(4005, () => {
  console.log('Events application v2 listening on port 4005...')
})