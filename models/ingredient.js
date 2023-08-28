const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
    name: String,
    properties: String,
    serving: Number,
    //Nutrients are per 100gr
    kcal: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    carbs: {
        type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    image: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, {
  timestamps: true
});


module.exports = mongoose.model('Ingredient', ingredientsSchema);