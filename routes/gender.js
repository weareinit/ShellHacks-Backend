var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res){
   models.Gender.findAll()
      .then(genders => {
         res.json(genders);
      });   
});

module.exports = router;