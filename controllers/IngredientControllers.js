const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// index
router.get('/', function(req, res) {
    const ingredients = Ingredient.find({})
    res.render('ingredients/index',{title:'Ingredients', ingredients});
});



// new

router.get('/new', function(req, res) {
    res.render('ingredients/new',{title:'New Ingredient'});
});

// show
router.get('/:idIngredient', function(req, res) {
    Ingredient.find({_id:req.params.idIngredient})
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


// create

router.post('/',function create(req,res){
    Ingredient.create(req.body)
        .then(ingredientDoc => {
            console.log('this is my new ingredient',ingredientDoc)
            return res.redirect('/ingredients')
        })
        .catch(err => {
            console.log('===err===')
            console.log(err)
            console.log('===err===')
            return res.send('err creating - check terminal')
        })
    
})
// edit
// update
// delete

module.exports = router;