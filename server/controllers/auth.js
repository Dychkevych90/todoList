const User = require("../models/users");
const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        return res.status(400).json({massage: 'email is already busy, try another'})
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({
        email, password: hashedPassword
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

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({massage: 'email is not found'})
      }

      const isMatch = bcrypt.compare(password, user.password)

      if(!isMatch){
        return res.status(400).json({massage: 'password do not match'})
      }

      const jwtSecret = 'asdjsldfjdngaskdja;sdja;sdljalsdjnfmdngfsdjfjsdf';

      const token = jwt.sign(
        {userId: user.id},
        jwtSecret,
        {expiresIn: '1h'}
      )

      res.json({token, userId: user.id})

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