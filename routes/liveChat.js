const express = require('express')
const router = express.Router()

const users = ['admin'] // Dummy array for users

router.get('/', (req, res, next) => {
  res.render('pages/pr12-login', {
    title: 'Prove Activity 12',
    path: '/proveActivities/12'
  })
})

// Verify login submission to access chat room.
router.post('/login', (req, res, next) => {
  console.log(users);
  // Extract username from req.body
  const {
    username
  } = req.body;
  console.log(username);
  // Do some simple validation
  if (!username || username.trim() === '')
    // HTTP 400 = BAD REQUEST
    return res.status(400).send({
      error: 'Username cannot be empty!'
    });

  // Check for duplicates
  if (users.includes(username.trim()))
    // HTTP 409 = CONFLICT
    return res.status(409).send({
      error: 'Username has already been used!'
    });

  // No errors, add to the list and send the username back
  users.push(username.trim());
  req.session.user = username;
  res.status(200).send({
    username: username.trim()
  });
});

// Render chat screen.
router.get('/chat', (req, res, next) => {
  // This route is simple, just render the chat page.
  res.render('pages/pr12-chat', {
    title: 'Prove Assignment 12',
    path: '/proveAssignments/12',
    // Pass in the user saved in the session
    user: req.session.user,
  });
});

// // Reset users
// router.get('/clear', (req, res, next) => {
//   // This route is simple, just reset the user list.
//   users.splice(0, users.length);
//   users.push('admin');
//   res.redirect('/');
// });

module.exports = router