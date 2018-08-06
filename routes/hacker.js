var models  = require('../models');
var express = require('express');
var jwt = require('express-jwt');
var router  = express.Router();

router.get('/', function(req, res){
   console.log("gotten");
});

router.post('/', function(req, res){
    //TODO: Use JOI to better validate these entries?
   models.Hacker.create({
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      gender: req.body.gender,
      class_year: req.body.class_year,
      school: req.body.school,
      race: req.body.race,
      state: req.body.state,
      shirt_size: req.body.shirt_size,
      diet_restriction: req.body.diet_restriction,
      diet_other: req.body.diet_other,
      major: req.body.major,
      github: req.body.github,
      linkedin: req.body.linkedin,
      phone_number: req.body.phone_number,
      is_first_hackathon: req.body.is_first_hackathon,
      activity_info: req.body.activity_info,
      resume: req.body.resume,
      //TODO: Remove this as we're not setting a session ID anymore
      sid: req.body.sid,
      is_hispanic: req.body.is_hispanic,
      age: req.body.age
      //TODO: Add graduating year, as we're asking for that too
   }).then(function(){
      res.redirect('/');
   })
});

//Using express-jwt we can then easily validate the jwt through middleware
//The JWT is sent via the 'Bearer' header in the request
//The payload is accesible under req.user so we can then do stuff with the data afterwards
router.get('/:email', 
    jwt({secret: 'SecretWeShouldBeStoringInAnEnvironmentVariableOrConfigFile'}),
    function(req, res){
        if(!req.user.admin){
            res.send({message: 'yee, you are who you say you are'});
        } else {
            res.send({message: 'welcome back mr admin'});
        }
});

module.exports = router;