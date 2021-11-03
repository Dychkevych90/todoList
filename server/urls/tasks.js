const task = require('../models/tasks')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const tasks = await new task.find()
    res.send(tasks);
  } catch (e) {
    res.send(e);
  }
})

router.post('/', async (req, res) => {
  try {
    const task = await new task(req.body).save();
    res.send(task);
    console.log(res.json(task))
  } catch (e) {
    res.send(e);
  }
})

module.exports = router;