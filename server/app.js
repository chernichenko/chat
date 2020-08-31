const express = require('express')
const config = require('config')
const createRoutes = require('./core/routes')
require('./core/db')

const app = express()

createRoutes(app)

const PORT = config.get('port') || 5000
app.listen(PORT, () => { console.log(`Server started!`) })