// This is your test secret API key.

const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';



app.listen(4242, () => console.log('Running on port 4242'));