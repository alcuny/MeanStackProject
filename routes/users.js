const express = require('express');

const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const config = require('../config/passport');
const config1 = require('../config/database');
const jwt = require('jsonwebtoken');

// register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
        
    });
    
    User.addUser(newUser, (err, user) => {
        
        if (err) {
            res.status(500).json({ success: false, msg: 'Failed to register user' });
        } else {
            res.status(200).json({ success: true, msg: 'User registered' });
            
        }
    });
    
});

//router.post('/authenticate', (rq,res,next) => {
//    res.send('PROFILE');
//})
// authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
          return res.json({ success: false, msg: 'user not found' });
      }
      User.comparePassword(password, user.password, (err, isMatch) => {
          console.log('test');
          if (err) throw err;
          if (isMatch) {
            console.log('test', config1.secret);

            const token = jwt.sign({ data: user }, config1.secret, {
              expiresIn: 604800
     });
     console.log('test2');
              res.json({
                  succes: true,
                  token: 'JWT '+ token ,
                  user: {
                      id: user._id,
                      name: user.name,
                      username: user.username,
                      email: user.email
                  }
              })
          }
          else {
              return res.json({ succes: false, msg: 'wrong password' });
          }
      })

  })
})
//C:\Program Files\MongoDB\Server\6.0\bin\mongosh-1.9.0-win32-x64\bin

// profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req,res,next) => {
    res.json({user: req.user});
})


module.exports = router;