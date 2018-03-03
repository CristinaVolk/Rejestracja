const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
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
  }});
/*  password2:{
    type: String,
    required: true, //wrrrrr   never ever do this!  why hold in DB password2???
    //it is unnecessery !but where do we should hold it?  why you want hold it???to identify the user, give  5 min !!!
    //are you here?  --> papa uciekam, daj mi znać jak sie coś zmieni, nie ma sensu trzymać w bazie password2 , to jest tylko informacja kontrolna
    //raz przy rejestra
},
});*/

const User = module.exports = mongoose.model('User', UserSchema, 'User');
