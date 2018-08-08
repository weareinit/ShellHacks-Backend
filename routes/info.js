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
   models.classYear.findAll()
      .then((classYear) => {
         res.json(classYear);
      });
});

router.get('/diet', (req, res) => {
   models.diet.findAll()
      .then((diet) => {
         res.json(diet);
      })   
});

router.get('/event-schedule', (req, res) => {
   models.eventSchedule.findAll()
      .then((eventSchedule) => {
         res.json(eventSchedule);
      });
});

router.get('/major', (req, res) => {
   models.major.findAll()
      .then((major) => {
         res.json(major);
      });
});

router.get('/race', (req, res) => {
   models.race.findAll() 
      .then((race) => {
         res.json(race);
      });
});

router.get('/shirt-size', (req, res) => {
   models.shirtSize.findAll() 
      .then((shirtSize) => {
         res.json(shirtSize);
      })
});

router.get('/site-setting', (req, res) => {
   models.siteSetting.findAll()
      .then((siteSetting) => {
         res.json(siteSetting);
      })
});

router.get('/sponsor', (req, res) => {
   models.sponsors.findAll()
      .then((sponsors) => {
         res.json(sponsors);
      })
});

router.get('/state', (req, res) => {
   models.state.findAll()
      .then((state) => {
         res.json(state);
      })
});

module.exports = router;