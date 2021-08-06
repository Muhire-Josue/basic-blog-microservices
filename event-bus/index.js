const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', async (req, res) => {
  try {
    const events = req.body;
    await axios.post('http://localhost:4000/events', events);
    await axios.post('http://localhost:4001/events', events);
    await axios.post('http://localhost:4002/events', events);
  
    res.send({status: 200});
    
  } catch (error) {
    console.error(error);
  }
});

app.listen(4005, () => {console.log('Listening on port 4005')});