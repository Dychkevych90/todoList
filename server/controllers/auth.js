const User = require("../models/users");
const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");

router.post('/registration',
  [
    check('email', 'email is not correct').isEmail(),
    check('password', 'password is not correct').isLength({min: 6})
  ],
  async (req, res) => {
    try {

      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Data is not correct'
        })
      }

      const {email, password, first_name} = req.body;

      const inUser = await User.findOne({email})

      if (inUser) {
        return res.status(400).json({massage: 'email is already busy, try another'})
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user in our database
      const user = await User.create({
        first_name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      // Create token
      // save user token
      user.token = jwt.sign(
        {user_id: user._id, email},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // return new user
      res.status(201).json(user);
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

      const isMatch = bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({massage: 'password do not match'})
      }

      user.token = jwt.sign(
        {userId: user.id},
        process.env.TOKEN_KEY,
        {expiresIn: '2h'}
      );

      // user
      res.status(200).json(user);

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

router.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// This should be the last route else any after it won't work
router.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = router;