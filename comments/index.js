const express = require('express');
const{randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const commentsByPostId = {};
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', async (req, res) => {
const commentId = randomBytes(4).toString('hex');
const {content} = req.body;
const comments = commentsByPostId[req.params.id] || [];

comments.push({id: commentId, content});
commentsByPostId[req.params.id ] = comments;
await axios.post('http://localhost:4005/events', { 
  type: 'CommentCreated',
  id: commentId,
  content: content,
  postId: req.params.id,
});
app.post('/events', (req, res) => {
  console.log('Event Recieved', req.body.type);
  res.send({});
});
res.status(201).send(comments);
});
app.listen(4001, () => console.log('Listening to port 4001'));
