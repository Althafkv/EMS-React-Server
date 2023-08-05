require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./db/connection')

const server = express()

server.use(cors())
server.use(express.json())
// export upload folder as a static file / folder
server.use('/uploads', express.static('./uploads'))
server.use(router)

const PORT = 4000 || process.env.PORT

server.get('/', (req, res) => {
    res.send(`<h1>EMS Server Started</h1>`)
})

server.listen(PORT, () => {
    console.log(`EMS Server Started at PORT : ${PORT}`);
})
