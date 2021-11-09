const User = require("../models/users");
const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator')

router.post('/registration',
  [
    check('email', 'email is not correct').isEmail(),
    check('password', 'password is not correct').isLength({min: 6})
  ]
  , async (req, res) => {
    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Data is not correct'
        })
      }

      const {email, password} = req.body;

      const inUser = await User.findOne({email})

      if (inUser) {
        return res.status(300).json({massage: 'email is already busy, try another'})
      }

      const user = new User({
        email, password
      })

      await user.save()

      res.status(201).json({message: 'user created'})
    } catch (e) {
      console.log(e)
    }
  })

router.post('/login',
  [
    check('email', 'email is not correct').isEmail(),
    check('password', 'password is not correct').exists()
  ]
  , async (req, res) => {
    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Data is not correct'
        })
      }

      const {email, password} = req.body;

      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({massage: 'email is not found'})
      }

      const userPass = await User.findOne({password})

      if (!userPass) {
        return res.status(400).json({massage: 'wrong password'})
      }

      res.json({UserId: user.id})
    } catch (e) {
      console.log(e)
    }
  })

router.get("/users", async (req, res) => {
  try {
    const tasks = await User.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send('Something broke!');
  }
});

module.exports = router;