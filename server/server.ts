import express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send({ title: "Hello World"});
})

app.listen(4201, '127.0.0.1', function() {
    console.log('Server now listening on 4201');
})