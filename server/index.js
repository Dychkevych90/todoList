const tasks = require('./controllers/tasks')
const user = require('./controllers/auth')
require("dotenv").config();
const connection = require('./db');
const cors = require("cors");
const express = require('express');
const app = express();
const { API_PORT } = process.env;

connection()

app.use(express.json({extended: true}))
app.use(cors())

app.use('/api/tasks', tasks)
app.use('/api/auth', user)

const port = process.env.PORT || API_PORT;
app.listen(port, ()=> console.log(`Server running at ${port}`))