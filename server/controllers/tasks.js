const Task = require("../models/tasks");
const express = require("express");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const {task, author} = req.body;

    const todo = await new Task({
      task,
      author,
      completed: false
    })

    await todo.save()

    res.send(todo)
    // const task = await new Task(req.body).save();
    // res.send(task);
  } catch (error) {
    res.status(500).send('Something broke!');
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const tasks = await Task.find({author: userId});
    res.json(tasks);
  } catch (error) {
    res.status(500).send('Something broke!');
  }
});

router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.send(task);
  } catch (error) {
    res.status(500).send('Something broke!');
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.status(500).send('Something broke!');
    //res.send(error);
  }
});

module.exports = router;