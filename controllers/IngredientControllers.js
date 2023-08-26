const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// index
router.get('/', function(req, res) {
    const ingredients = Ingredient.find({})
    res.render('ingredients/index',{title:'Ingredients', ingredients});
});

// show
router.get('/show', function(req, res) {
    Ingredient.find({_id:req.params.id})
        .then(ingredientDoc => {
            console.log('This is my Ingredient',ingredientDoc)
            res.render('ingredients/show',{title:'Ingredient', ingredient:ingredientDoc});
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
});

// new

router.get('/new', function(req, res) {
    res.render('ingredients/new',{title:'New Ingredient'});
});
// create
// edit
// update
// delete

module.exports = router;