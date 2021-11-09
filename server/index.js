const tasks = require('./controllers/tasks')
const user = require('./controllers/auth')
const connection = require('./db');
const cors = require("cors");
const express = require('express');
const app = express();

connection();

app.use(express.json({extended: true}))
app.use(cors())

app.use('/api/tasks', tasks)
app.use('/api/auth', user)

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log(`Server running at ${port}`))