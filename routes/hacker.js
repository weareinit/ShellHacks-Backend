var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res){
   console.log("gotten");
});

router.post('/', function(req, res){
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
      sid: req.body.sid,
      is_hispanic: req.body.is_hispanic,
      age: req.body.age
   }).then(function(){
      res.redirect('/');
   })
});

module.exports = router;