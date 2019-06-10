const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const reviewsSchema = new mongoose.Schema({
    created:{
        type: Date,
        default: Date.now
    },
    author:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:'Author is needed'

    },
    text:{
        type: String,
        required:'You must leave a review'
    },
    writing:{
        type:mongoose.Schema.ObjectId,
        ref:'Writing',
        required:'Supply a Writing'
    }
})

function autopopulate (next){
    this.populate('author');
    next();
}

reviewsSchema.pre('find', autopopulate);
reviewsSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Reviews', reviewsSchema);