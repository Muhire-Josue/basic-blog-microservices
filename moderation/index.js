const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/events', (req, res) => {

});

app.listen(4003, () => {console.log('Listening on port 4003');})
