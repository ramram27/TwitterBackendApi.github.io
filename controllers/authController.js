
const User = require('../model/User');

//error handler
const handleError = (err) =>{
  console.log(err.message, err.code);
  let errors = {email: '', password: ''};

//dupicate error code
if(err.code === 11000) {
  errors.email = 'That email is aleady registered';
  return errors;
}

  //validation errors 
  if(err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const {email, password} = req.body;

   try {
     const user = await User.create({email, password});
     res.status(201).json(user);
   }
   catch (err) {
    let errors = handleError(err);
     res.status(400).json({errors});
   }
}

module.exports.login_post = async (req, res) => {
  const {email, password} = req.body;
  
  try {
    const user = await User.login(email,password);
    res.status(200).json(user);
  }
  catch(err) {
   
   let errors = {email: 'That email is not registered', password: 'That password is incorrect'};
    res.status(400).json({errors});
  }
}