const passport = require('passport');
exports.login = passport.authenticate('local', {

    failureRedirect:'login',
    failureFlash: 'Failed Login!',
    successRedirect:'/',
    successFlash: 'You are now logged in!'

})

exports.logout = (req, res) => {
    req.logout();
    req.flash('success', `Successfully logout`);
    res.redirect('/')
}

exports.isLoggedIn = (req, res, next) =>{
    if (req.isAuthenticated()) {
        next();
        return;
    }
    req.flash('success', `You need to login`);
    res.redirect('/')
}