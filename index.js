const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("The server is working and this is a get request")
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}...`)
})