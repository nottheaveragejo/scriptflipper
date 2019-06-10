const mongoose = require('mongoose');
const Reviews = mongoose.model('Reviews');

exports.addReview = async (req, res) =>{ 
    req.body.author = req.user._id;
    req.body.writing = req.params.id;
    const newReview = new Reviews(req.body);
    await newReview.save();
    req.flash('success', 'Review Saved!');
    res.redirect('/');
    // res.json(req.user);
 }