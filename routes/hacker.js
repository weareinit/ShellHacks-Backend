var models  = require('../models');
var express = require('express');
var jwt = require('express-jwt');
var router  = express.Router();
const bcrypt = require('bcrypt');
const { celebrate, Joi, errors } = require('celebrate');
const customJoi = Joi.extend(require('joi-phone-number'));
const mailgun = require('mailgun.js');


let hashPassword = (password) => {
    const saltRounds = 10;
    let saltAndPepper =  bcrypt.hashSync(password, 10);
    
    return saltAndPepper;
}

let registrationSchema = Joi.object().keys({
    f_name: Joi.string().required().max(100).trim().label('First Name'),
    l_name: Joi.string().required().max(100).trim().label('Last Name'),
    email: Joi.string().required().email().trim().label('Email'),
    pass: Joi.string().required().min(8).trim().label('Password'),
    confirmPass: Joi.string().required().trim().valid(Joi.ref('pass')).strip().label('Password Confirmation'),
    gender: Joi.number().integer().required().min(1).label('Gender'),
    class_year: Joi.number().integer().required().min(1).label('Class Year'),
    school: Joi.number().integer().required().min(1).label('School'),
    race: Joi.number().integer().required().min(1).label('Race'),
    state: Joi.number().integer().required().min(1).label('State'),
    shirt_size: Joi.number().integer().required().min(1).label('Shirt Size'),
    diet_restriction: Joi.number().integer().required().min(1).label('Dietary Restrictions'),
    diet_other: Joi.string().max(200).trim().label('Dietary Restrictions (Other)'),
    major: Joi.number().integer().required().min(1).label('Major'),
    github: Joi.string().uri({scheme: ['http','https']}).label('GitHub URL'),
    linkedin: Joi.string().uri({scheme: ['http','https']}).label('LinkedIn URL'),
    phone_number: customJoi.string().required().label('Phone Number'),
    is_first_hackathon: Joi.boolean().required().label('Is this your first hackathon?'),
    activity_info: Joi.string().max(200).trim().label('Activity Suggestions'),
    resume: Joi.string().uri({scheme: ['http','https']}).label('Resume'),
    is_hispanic: Joi.boolean().required().label('Are you hispanic?'),
    age: Joi.number().integer().min(18).max(99).required().label('Age')
});

router.use(errors());

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
   res.json(" ");
});

router.post('/', function(req, res){
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
        res.json({'message':"Hacker created successfully!"});
   })
   .catch((err) => {
<<<<<<< HEAD
        res.status(500).send({"error": err});
=======
      res.json(err.message);
>>>>>>> 7e41c7f49859ee1e6b1c230e73f35202a5275126
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
            res.status(500).send({"error": err});
        });
});

router.put('/:email/password', 
    jwt({secret:process.env.SECRET_JWT}),
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
    (req, res, next) => {
        models.Hacker.findOne({
            where:{
                email: req.params.email
            }
        })
        .then((hacker) => {
            if(hacker) {
                const token = tokenJwt.sign(
                    {
                        email: hacker.email,
                        exp: Math.floor(Date.now()/ 1000 ) + (60 * 60)
                    },
                    'secret'
                )   

                const mg = mailgun.client({username:'api', key: process.env.MAILGUN_KEY});

                //url with token needs to be included

                let data = {
                    from: 'ShellHacks <noreply@maggicconch.shellhacks.net>',
                    to: [hacker.email],
                    subject: 'password resseti my spaghetti',
                    html: `<h1> Clickety my linky ${token}</h1>`,
                    'h:Reply-To': 'UPE <upe@fiu.edu>'
                }

                mg.messages.create(process.env.MAILGUN_DOMAIN, data)
                .then((msg) => {
                    console.log(msg);
                    res.json("EMAIL SENT");
                })
                .catch((err) => {
                    res.json(err.message);
                })

            }
        })
        .catch((err) => {
            console.log(err);
            res.json(err.message);
        })
    })

router.put('/:email/reset-password', 
    (req, res, next) => {
        //joi validation
        models.Hacker.update(
        {
            pass: hashPassword(req.body.password)
        }, 
        {
            where:
            {
                email:req.params.email
            } 
        })
        .then(() => {
            res.json("Password reset");
        })
        .catch((err) => {
            res.json(err.message);
        })
        
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