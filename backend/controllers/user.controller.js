const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const SALT_ROUNDS = 10

const registerUser = async (req, res) => {
  const { username, email, password, address} = req.body

  if (!username || !email || !password) {
    return res.status(400).json({error: 'error occured in json body'})
  } else if (await User.findOne({email})) {
    console.log('user exists !!')
    return res.status(400)
  } else {
    try {
      const hashed = await bcrypt.hash(password, SALT_ROUNDS)
      const user = await User.create({username, email, "password": hashed, address})

      req.session.userId = user._id

      return res.status(200).json({error: 'user created successfully ..'})
    } catch (errors) {
      console.log(`error: ${errors}`)
      return res.status(400).json({error: 'An error occured'})
    }
  }

};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ error: 'Login failed' }); // Generic error message
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Login failed' }); // Generic error message
    }

    req.session.userId = user._id;

    console.log(`Login successful | User: ${user.username}`);
    res.json({ message: 'Login successful' }); // Avoid sending sensitive data
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { registerUser, loginUser };
