const mongoose = require('mongoose');
const Writing = mongoose.model('Writing');
const User = mongoose.model('User')


exports.homepage = (req, res) => {
    res.render('home')
    
}


exports.addWriting = (req, res) => {
    res.render('editWriting', {title: 'Add Writing'})
}

exports.createWriting = async (req, res) => {
    req.body.author = req.user._id;
    const writing = await (new Writing(req.body)).save();
    req.flash('success', `Successfully Created ${writing.name}. Care to leave a review?`);
    console.log('hello');
    res.redirect(`/writing/${writing._id}`)
    // res.redirect(`/writing/${writing.slug}`)
    
}


exports.getWriting = async (req, res) => {
    const writings = await Writing.find();
    res.render('writing', {title: 'writings', writings})
}

const confirmOwner = (writing, user) => {
    if (!writing.author.equals(user._id)) {
        // req.flash('You must own a store in order to edit it!')
      throw Error('You must own a store in order to edit it!');
    }
  };
exports.editWriting = async (req, res) =>{
    const writing = await Writing.findOne({ _id: req.params.id });  
    //res.json(writing)
    confirmOwner(writing, req.user);
    res.render('editWriting', {title: `Edit page ${writing.title}`, writing})
   
 }

 exports.updateWriting = async (req, res) =>{
     const writing = await Writing.findOneAndUpdate({_id: req.params.id },
       req.body, {
       new: true,
         // return the new store instead of the old one
        runValidators: true
      }).exec();
      req.flash('success', `Successfully updated`);
      res.redirect(`/writing`, {title:'Update successful'}, writing)
 }
   
//get single single writing
exports.getSingleWriting = async(req, res, next) =>{
    //const writing = await Writing.findOne({ slug: req.params.slug }).populate('author reviews');
    const writing = await Writing.findOne({ _id: req.params.id }).populate('author reviews');
    if (!writing) return next();
    res.render('singleWriting', {writing, title: writing.name})
}


exports.heartWriting = async(req, res) =>{
    const hearts = req.user.hearts.map(obj => obj.toString());
    const operator = hearts.includes(req.params.id) ? '$pull' :'$addToSet';
    const user = await User.findByIdAndUpdate(req.user._id,
        {[operator]:{ hearts: req.params.id}},
        {new:true})
    User.findOneAndUpdate()
    req.flash('success', `Successfully Added`);
    res.redirect(`/writing`)

}


exports.heartsPage = async (req, res) => {
    const writings = await Writing.find({
      _id: { $in: req.user.hearts }
    });
    // res.json(writings)
    res.render('writing', { title: 'Hearted Stores', writings });
  };