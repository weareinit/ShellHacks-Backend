var models  = require('../models');
var express = require('express');
var jwt = require('express-jwt');
var router  = express.Router();
const bcrypt = require('bcrypt');
const expressJoi = require('express-joi');
const Joi = expressJoi.Joi;
const customJoi = Joi.extend(require('joi-phone-number'));


let hashPassword = (password) => {
    const saltRounds = 10;
    let saltAndPepper =  bcrypt.hashSync(password, 10);
    
    return saltAndPepper;
}

let registrationSchema = {
    f_name: Joi.types.String().required().max(100).trim(),
    l_name: Joi.types.String().required().max(100).trim(),
    email: Joi.types.String().required().email().trim(),
    pass: Join.types.String().required().min(8).trim(),
    confirmPass: Join.types.String().required().trim().valid(Joi.ref('pass')).strip(),
    gender: Joi.types.Number().integer().required().min(1),
    class_year: Joi.types.Number().integer().required().min(1),
    school: Joi.types.Number().integer().required().min(1),
    race: Joi.types.Number().integer().required().min(1),
    state: Joi.types.Number().integer().required().min(1),
    shirt_size: Joi.types.Number().integer().required().min(1),
    diet_restriction: Joi.types.Number().integer().required().min(1),
    diet_other: Joi.types.String().max(200).trim(),
    major: Joi.types.Number().integer().required().min(1),
    github: Joi.types.String().uri({scheme: ['http','https']}),
    linkedin: Joi.types.String().uri({scheme: ['http','https']}),
    phone_number: customJoi.types.String,
    is_first_hackathon: Joi.types.Boolean(),
    activity_info: Joi.types.String().max(200).trim(),
    resume: Joi.types.String().uri({scheme: ['http','https']}),
    is_hispanic: Joi.types.Boolean(),
    age: Joi.types.Number().integer().min(18).max(99),
}

let authMiddleware = (req, res, next) => {
    if(req.user.email != req.params.email) {
        res.json("Unauthorized user: Make sure that login token is for the proper user");
    }
    else {
        next();
    }
}

let generateAlphaCode = (size) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
        
    return text;
}

router.get('/', function(req, res){
   res.json("Nothing here yo");
});

router.post('/', expressJoi.joiValidate(registrationSchema), function(req, res){
   models.Hacker.create({
      f_name: req.body.f_name,
      l_name: req.body.l_name,
      email: req.body.email,
      pass: hashPassword(req.body.pass),
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
      is_hispanic: req.body.is_hispanic,
      age: req.body.age,
      check_in_code: generateAlphaCode(6)
   })
   .then(function(){
       res.json({'message':"yeah"});
   })
   .catch((err) => {
      res.json(err);
   })
});

//The payload is accesible under req.user so we can then do stuff with the data afterwards
router.get('/:email', 
    jwt({secret: process.env.SECRET_JWT}),
    authMiddleware,
    (req, res, next) => {
        models.Hacker.findOne({
            where: {
                email: req.params.email
            }
        })
        .then((hacker) => {
            hacker.pass = "";
            res.json(hacker);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.put('/:email/password', 
    jwt({secret:'secret'}),
    authMiddleware,
    (req, res) => {
        models.Hacker.update(
        {
            pass: hashPassword(req.body.password)
        }, 
        {
            where:{
            email:req.params.email
        } 
        })
        .then(() => {
            res.json("Updated password");
        })
        .catch((err) => {
            res.json(err.message);
        })
    })

router.post('/:email/reset-password', 
jwt({secret: process.env.SECRET_JWT}),
    authMiddleware,
    (req, res, next) => {
        
    })

router.put('/:email/reset-password', 
    jwt({secret:process.env.SECRET_JWT}),
    authMiddleware,
    (req, res, next) => {

    });

router.post('/:email/confirm-acceptance', 
    jwt({secret: process.env.SECRET_JWT}),
    authMiddleware,
    (req, res, next) => {
        models.Hacker.update({
            has_rsvp:1,
        }, {
            where: {
                email: req.params.email
            }
        })
        .then(() => {
            res.json("Updated");
        })  
        .catch((err) => {
            res.json(err);
        })
    });

module.exports = router;