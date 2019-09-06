require('dotenv').config();
const defaults = require('./config/defaults.js')
const express = require('express')
const db = require('./data/db.js')
const server = express();
const blogsRouter = require('./blogRouter/blog-router.js')
server.use(express.json());

server.use('/api/posts', blogsRouter)





server.listen(defaults.port, () => console.log('\napi running\n'));