const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const endpoints = [
    'http://localhost:4000/events',
    'http://localhost:4001/events',
  ];
  for(const endpoint of endpoints) {
    console.log(`Sending event to ${endpoint}`, req.body);
    axios.post(endpoint, req.body)
  }
  res.status(201).send({});
});

app.listen(4005, () => {
  console.log('Events application listening on port 4005...')
})