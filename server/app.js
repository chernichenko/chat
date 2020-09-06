const express = require('express')
const config = require('config')
const createRoutes = require('./core/routes')
const path = require('path');
require('./core/db')

const app = express()

global.rootPath = path.resolve(__dirname);

createRoutes(app)

const PORT = config.get('port') || 5000
app.listen(PORT, () => { console.log(`Server started!`) })