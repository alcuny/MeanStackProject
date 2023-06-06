const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        requires: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback());
      });
    });
  }

  /*module.exports.addUser = function(newUser) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10)
        .then((salt) => bcrypt.hash(newUser.password, salt))
        .then((hash) => {
          newUser.password = hash;
          return newUser.save();
        })
        
        .then((savedUser) => {
          resolve(savedUser);
          console.log('testies');
        })
        .catch((err) => {
          reject(err);
          console.log('testies123');
        });
    });
  };*/

/*module.exports.addUser = function(newUser){
    return bcrypt.genSalt(10)
    .then(salt => {
        return bcrypt.hash(newUser.password, salt);
    })
    .then(hash => {
        newUser.password = hash;
        return newUser.save();
    })
    .catch(err => console.log(err));
}*/
