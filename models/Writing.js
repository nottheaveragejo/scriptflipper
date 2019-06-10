const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const writingSchema = new mongoose.Schema ({
    title:{
        type: String,
        trim: true,
        required: 'Enter a title'
    },

    description: { 
        type: String,
         trim:true
    }, 
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'You must supply an author'
      }
    },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
     

});



writingSchema.pre('save', function(next) {
    if (!this.isModified('title')) {
      next(); // skip it
      return; // stop this function from running
    }
    this.slug = slug(this.title);
    next();
    // TODO make more resiliant so slugs are unique
  });

  writingSchema.virtual('reviews', {
      ref:'Reviews',
      localField:'_id',
      foreignField:'writing'

  })

  function autopopulate(next) {
    this.populate('reviews');
    next();
  }
  
  writingSchema.pre('find', autopopulate);
  writingSchema.pre('findOne', autopopulate);
  

module.exports = mongoose.model('Writing', writingSchema);