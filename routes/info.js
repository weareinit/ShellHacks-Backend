var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/schools', (req, res) => {
   models.school.findAll()
      .then((school) => {
         res.json(school);
      })
      .catch((err) => {
         res.json(err);
      });
});

router.get('/class-years', (req, res) => {
   models.class_years.findAll()
      .then((classYear) => {
         res.json(classYear);
      })
      .catch((err) => {
         res.json(err);
      });;
});

router.get('/diets', (req, res) => {
   models.diet.findAll()
      .then((diet) => {
         res.json(diet);
      })   
});

router.get('/events', (req, res) => {
   models.events_schedule.findAll()
      .then((eventSchedule) => {
         res.json(eventSchedule);
      });
});

router.get('/majors', (req, res) => {
   models.major.findAll()
      .then((major) => {
         res.json(major);
      });
});

router.get('/races', (req, res) => {
   models.race.findAll() 
      .then((race) => {
         res.json(race);
      });
});

router.get('/shirt-sizes', (req, res) => {
   models.shirt_sizes.findAll() 
      .then((shirtSize) => {
         res.json(shirtSize);
      })
});

router.get('/site-settings', (req, res) => {
   models.site_settings.findAll()
      .then((siteSetting) => {
            let settings = {};
            siteSetting.forEach(setting => {
                  settings[setting.name] = setting.value;
            });
            res.json(settings);
      })
});

router.get('/sponsors', (req, res) => {
   models.sponsors.findAll()
      .then((sponsors) => {
         res.json(sponsors);
      })
});

router.get('/states', (req, res) => {
   models.state.findAll()
      .then((state) => {
         res.json(state);
      })
});

module.exports = router;