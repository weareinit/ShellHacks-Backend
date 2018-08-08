var models  = require('../models');
var express = require('express');
var jwt = require('express-jwt');
var tokenJwt = require('jsonwebtoken');
var router  = express.Router();
const bcrypt = require('bcrypt');
const mailgun = require('mailgun.js')

let hashPassword = (password) => {
    const saltRounds = 10;
    let saltAndPepper =  bcrypt.hashSync(password, 10);
    
    return saltAndPepper;
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

router.post('/', function(req, res){
    //TODO: Use JOI to better validate these entries?
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

//Using express-jwt we can then easily validate the jwt through middleware
//The JWT is sent via the 'Bearer' header in the request
//The payload is accesible under req.user so we can then do stuff with the data afterwards
router.get('/:email', 
    jwt({secret: 'secret'}),
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

router.post('/:email/reset-password', 
    (req, res, next) => {
        models.Hacker.findOne({
            where:{
                email: req.params.email
            }
        })
        .then((hacker) => {
            if(hacker) {
                //mailgun shit will go here sending an email with a link with embedded jwt

                const token = tokenJwt.sign(
                    {
                        email: hacker.email,
                        exp: Math.floor(Date.now()/ 1000 ) + (60 * 60)
                    },
                    'secret'
                )   

                const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY})

                let data = {
                    from: 'ShellHacks <noreply@maggicconch.shellhacks.net>',
                    to: hacker.email,
                    subject: 'password resseti my spaghetti',
                    html: `<h1> Clickety my linky ${token}</h1>`,
                    'h:Reply-To': 'UPE <upe@fiu.edu>'
                }

                mg.messages.create(process.env.MAILGUN_DOMAIN, data)
                    .then(msg => console.log(msg))
                    .catch(err => console.log(msg)); 

                //sends this to a url with token 

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
    jwt({secret: 'secret'}),
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