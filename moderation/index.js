const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
const {type, data} = req.body;

if (type === 'CommentCreated') {
  const status = data.content.includes('organce') ? 'rejected' : 'approved';
  await axios.post('http://localhost:4005/events', {
    type: 'CommentModerated',
    id: data.id,
    postId: data.postId,
    content: data.content,
    status,
  });
}
return res.send({});
});

app.listen(4003, () => {console.log('Listening on port 4003');})
