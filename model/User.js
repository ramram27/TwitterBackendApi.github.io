
const mongoose = require('mongoose');
const {isEmail} = require('validator');
var bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


 const userSchema = new Schema({

  email:{
    type: String,
    unique : true,
    lowercase : true,
    required : [true,  'Please enter an email'],
    validate : [isEmail, 'Please enter a valid email']
    },

  password:{
    type : String,
    minlength : [8, 'Minimum password length is 8 character'],
    required : [true, 'Please enter an password']
    }
  
 });


 userSchema.pre('save', async function (next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
   next();
 });

 userSchema.statics.login = async function(email, password) {
   const user = await this.findOne({email});
   if(user) {
   const auth = await bcrypt.compare(password,user.password);
   if(auth) {
     return user;
   }
    throw Error ('incorrect password');
   }
   throw Error('incorrect email');
 }
 


const User = mongoose.model('User', userSchema);

module.exports = User;