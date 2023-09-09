const mongoose = require('mongoose');
const ingredient = require('./ingredient');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const smoothieSchema = new Schema({
    name: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ingredients: [{
        qty: Number,
        ing: {
            type: Schema.Types.ObjectId,
            ref: 'Ingredient',
            required: true
        }
    }],
    reviews: [reviewSchema],
    image: String
    
    }, {
    timestamps: true
});


module.exports = mongoose.model('Smoothie', smoothieSchema);