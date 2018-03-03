var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var router = express.Router();
var bcrypt = require ('bcryptjs');
var mongoose = require('mongoose');
var User = require('../models/user.js');
var User = mongoose.model('User');
/*const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  password2:{
    type: String,
    required: true,
},
});
// Register From
router.get('/register', function(req, res){
  console.log('arrarara');
  res.json('register');
});

router.post('/register',function(req, res){
  console.log('arararara2');
  console.log('registering users');
  console.log(req.body)
  var name = req.body.name || null;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  User.create({
    name:name,
    email:email,
    password:bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    password2:bcrypt.hashSync(password2, bcrypt.genSaltSync(10))
  }, function(err, user){
    if (err){
      console.log(err);
      res.status(400)
         .json(err);
    } else{
      console.log('user created', user);
      res.status(201)
          .json(user);

    }
  });
});*/
router.get('/login', function(req, res){
  res.render('login');
});
router.post('/login', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
console.log(password);
  User.findOne({
    email: email
  }).exec(function(err, user){
    if (err){
      console.log(err);
      res.status(400)
          .json(err);
    } else {
      if (bcrypt.compareSync(password, user.password)){
      console.log('Welcome to hell');
      res.status(200)
         .json({success:true});
    }
    else {
     console.log('You are not registered');
     res.status(401)
        .json('Unauthorized');
   }
 }
});
});

//Register Proccess
router.get('/register', function(req, res){
  console.log('kryys');
  res.render('register');
});
router.post('/register', function(req, res){
  var name = req.body.name || null;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;


  req.checkBody('name', 'Name is required').notEmpty();  //checkBody is not a express function!!!! it is an external library - expressValidator
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();
  console.log('test1')
  if (errors){
    console.log(errors);
    res.status(500)
        .json(errors);

  } else {

    bcrypt.genSalt(10, function(err, salt){
      console.log('arararrara');
      bcrypt.hash(password, salt, function(error, hash){

          if(err){
            console.log(err);
            }
            let newUser = new User({
              name:name,
              email:email,
              password:hash,
              //password2:hash,
            });
            newUser.save(function(err, result){
              if(error){
                console.log(err);
                return;
              } else {
            //req.flash('success', 'You are now registered and can log in'); // po co Ci ten flash !:)е to nie moj to milosza
            //res.send('Welcome!')
            console.log(result, 'aaa')
            res.redirect('/api/login');
          }
        })
      });
    })
  }
});


// POST method route
router.post('/test_post', function (req, res) {
  console.log(req.body)
  res.send('test post')
});


// respond with "test get" when a GET request is made to the homepage
router.get('/test', function (req, res) {
  res.render('test')
});

  router.get('routes/index', function (req, res) {
    res.send(req.params)
  });



router.get('/', function(req, res){
  res.render('index', {
    title:'Kobieta z Wiggorem'
  });

});

module.exports = router;
