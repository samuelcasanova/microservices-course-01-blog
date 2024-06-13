const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const postComments = commentsByPostId[postId] || [];
  res.send(postComments);
});

app.post('/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  const postComments = commentsByPostId[postId] || [];
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');
  postComments.push({ id: commentId, content });
  commentsByPostId[postId] = postComments;
  res.status(201).send(commentsByPostId[postId]);
});

app.listen(4001, () => {
  console.log('Comments application listening on port 4001...')
})