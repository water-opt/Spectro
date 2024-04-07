const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Rider = require('../models/Rider');

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
  const { email, password } = req.body;
  
  console.log(typeof password)

  try {
    console.log(password)

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    let user, rider;
    let isMatchUser, isMatchRider;

    user = await User.findOne({ email: email });
    rider = await Rider.findOne({ email: email });

    if (user) {
      isMatchUser = bcrypt.compare(password, user.password);
    } else if (rider) { 
      isMatchRider = rider.nic.toString() === password;
    } else {
      return res.status(401).json({ error: 'Login failed' });
    }

    if (!(isMatchUser || isMatchRider)) {
      return res.status(401).json({ error: 'Login failed' }); 
    } else if (isMatchRider) {
      req.session.userId = rider._id;
      req.session.role = rider.role;
      console.log(`Login successful | User: ${rider._id}`);
      res.json({ message: 'Login successful', role: rider.role });
      console.log(rider.role)
    } else if (isMatchUser) {
      req.session.userId = user._id;
      req.session.role = user.role;
<<<<<<< HEAD
=======
      req.session.address = user.address;
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
      console.log(`Login successful | User: ${user._id}`);
      res.json({ message: 'Login successful', role: user.role });
      console.log(user.role)
    } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `${error}` });
  }
};

<<<<<<< HEAD


module.exports = { registerUser, loginUser };
=======
const LogoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to logout' });
    }

    res.json({ message: 'Logout successful' });
  });
};



module.exports = { registerUser, loginUser, LogoutUser };
>>>>>>> 4811b4f248ab8a21edc86372af783c9cae638d54
