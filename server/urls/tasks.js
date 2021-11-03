const Task = require('../models/tasks')
const express = require('express')
const {response} = require("express");
const router = express.Router()

router.get('/', async (require, response) => {
  try {
    const tasks = await new Task.find()
    response.send(tasks);
  } catch (e) {
    response.send(e);
  }
})

router.post('/', async (require, response) => {
  try {
    const task = await new Task(require.body).save();
    response.send(task);
  } catch (e) {
    response.send(e);
  }
})

module.exports = router;