var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});

router.post('/login', function(req, res) {
  //If user's password checks out, we give them a JWT
  //Logic to check if password is correct first go here

  var token = jwt.sign(
    //JSON/Object payload of Claims
    {
      name: "User",
      //Token expires in an hour
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      admin: false
    },
    'SecretWeShouldBeStoringInAnEnvironmentVariableOrConfigFile'
  );

  //Send the token back in an object for the client to store
  res.send({
    token: token
  });
});

module.exports = router;
