const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Schema and model
const userSchema = new mongoose.Schema({
  user_name: String,
  user_age: Number,
  user_city: String,
  user_phone: String,
  user_email: String
}, { collection: 'user-information' });

const User = mongoose.model('User', userSchema);

// GET / - form page
router.get('/', (req, res) => {
  res.render('index');
});

// POST /postData - form submission
router.post('/postData', async (req, res) => {
    console.log(req.body);
  const { user_name, user_age, user_city, user_phone, user_email } = req.body;

  // Basic input validation
  if (
    !user_name ||
    !user_age || isNaN(user_age) ||
    !user_city ||
    !user_phone ||
    !user_email ||
    !/^\S+@\S+\.\S+$/.test(user_email)
  ) {
    return res.render('error', { message: 'Invalid form submission. Please check your input.' });
  }

  const userData = {
    user_name,
    user_age: parseInt(user_age),
    user_city,
    user_phone,
    user_email
  };

  try {
    console.log(userData);
    const newUser = new User(userData);
    await newUser.save();
    console.log({ user: userData });
    res.render('success', { user: userData });
  } catch (error) {
    console.error('❌ Error saving user:', error);
    res.render('error', { message: 'Failed to insert data into MongoDB.' });
  }
});

// GET /users - show submitted users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users', { users });
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.render('error', { message: 'Failed to load users.' });
  }
});

module.exports = router;
