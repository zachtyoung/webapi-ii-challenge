require('dotenv').config();
const express = require('express')
const db = require('./data/db.js')
const server = express();
const blogsRouter = require('./blogRouter/blog-router.js')
server.use(express.json());

server.use('/api/posts', blogsRouter)




const port = process.env.PORT || 8000;
server.listen(port, () => console.log('\napi running\n'));