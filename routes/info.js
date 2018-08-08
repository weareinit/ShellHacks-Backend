var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/schools', (req, res) => {
   models.School.findAll()
      .then((school) => {
         res.json(school);
      });
});

router.get('/class-year', (req, res) => {
   
});

router.get('/diet', (req, res) => {

});

router.get('/event-schedule', (req, res) => {

});

router.get('/major', (req, res) => {

});

router.get('/race', (req, res) => {

});

router.get('/shirt-size', (req, res) => {

});

router.get('/site-setting', (req, res) => {

});

router.get('/sponsor', (req, res) => {

});

router.get('/state', (req, res) => {

});

module.exports = router;