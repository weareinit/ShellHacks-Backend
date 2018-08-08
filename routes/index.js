var models  = require('../models');
var express = require('express');
var router  = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/', function(req, res) {
  models.User.findAll()
  .then(function(users) {
    res.render('index', {
      title: 'Sequelize: Express Example',
      users: users
    });
  });
});

router.post('/login', function(req, res) {
  //If user's password checks out, we give them a JWT
  //Logic to check if password is correct first go here
  models.Hacker.findOne({
    where: {
      email: req.body.email,
    }
  })
  .then((hacker) => {
    if(hacker && bcrypt.compareSync(req.body.pass, hacker.pass)) {
      var token = jwt.sign(
        //JSON/Object payload of Claims
        {
          name: "User",
          email: hacker.email,
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
          admin: false
        },
        'secret'
      );
      //Send the token back in an object for the client to store
      res.send({
        token: token
      });
    } else {
      res.json({'message': 'user does not exist'});
    }
  });
});

module.exports = router;
