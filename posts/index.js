const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const posts = {};

app.get('/posts',(req, res) => {
  res.send(posts);
});
app.post('/posts', async(req, res) => {
  try {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
  
    posts[id] = {id, title};
    await axios.post('http://localhost:4005/events', {title: 'PostCreated', data: {id, title}});
    res.status(201).send(posts[id]);
  } catch (error) {
    console.error(error);
  }
});

app.post('/events', (req, res) => {
  console.log('Event Recieved', req.body.type);
  res.send({});
});



app.listen(4000, ()=>{console.log('Listening on 4000')});
