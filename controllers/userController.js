const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');


exports.loginForm = (req, res) => {
    res.render('login')
}

exports.registerForm = (req, res) => {

    res.render('registerForm', {title:'register form'});
}


exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.redirect('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return; // stop the fn from running
  }
   next(); // there were no errors!
};



  exports.register =  (req, res, next) => {
        const user = new User({ email: req.body.email, name: req.body.name });
         User.register(user, req.body.password, function(err, user){
            if(err){
              console.log(err)
            }
          
        });
        next();
        //res.send('user registered') 
    }

exports.account = (req, res) => {
    res.render('account', {title:'Your Account!'})
  }

exports.updateAccount = async(req, res) => {
  const updates = {
    name: req.body.name,
    email:req.body.email
  };
  const user = await User.findOneAndUpdate(
    { _id: req.user._id},
    {$set: updates},
    {new: true, runValidators: true, context: 'query'}
  );
  req.flash('success', `Successfully updated`);
  res.redirect('/');
}
