const tasks = require('./controllers/tasks')
const connection = require('./db');
const cors = require("cors");
const express = require('express');
const app = express();

connection();

app.use(express.json())
app.use(cors())

app.use('/api/tasks', tasks)

const port = process.env.PORT || 3001
app.listen(port, ()=> console.log(`Server running at ${port}`))