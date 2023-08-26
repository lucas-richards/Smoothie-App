const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientsSchema = new Schema({
    name: String,
    //Nutrients are per 100gr
    nutrients: {
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
        }
    },
    image: String

}, {
  timestamps: true
});


module.exports = mongoose.model('Ingredient', ingredientsSchema);