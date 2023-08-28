const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

const ROOT_URL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&ingr=banana&nutrition-type=cooking`



// index
router.get('/', function(req, res) {
    Ingredient.find({})
        .then(nutrientsDocs => {
            res.render('ingredients/index', {title:'Ingredients', ingredients: nutrientsDocs})
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

// show
router.get('/:idIngredient', function(req, res) {
    Ingredient.findById(req.params.idIngredient)
        .then(ingredientDoc => {
            console.log('This is my Ingredient',ingredientDoc)
            const total = ingredientDoc.protein + ingredientDoc.carbs + ingredientDoc.fat
            res.render('ingredients/show',{title:'', ingredient:ingredientDoc, total});
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
});


// create

router.post('/',function create(req,res){
    req.body.user = req.user._id
    Ingredient.create(req.body)
        .then(ingredientDoc => {
            console.log('this is my new ingredient',ingredientDoc)
            return res.redirect('/ingredients')
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
    
})
// edit

router.get('/:idIngredient/edit', function(req, res) {
    Ingredient.findById(req.params.idIngredient)
        .then(ingredientDoc => {
            res.render('ingredients/edit',{title:'', ingredient:ingredientDoc});
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
});

// update

router.patch('/:idIngredient', function(req, res) {
    Ingredient.findById(req.params.idIngredient)
        .then(ingredientDoc => {
            if (req.user && ingredientDoc.user == req.user.id) {
                return ingredientDoc.updateOne(req.body)
            } else {
                res.send('something went wrong')
            }
        })
        .then(data => {
            console.log('what is returned from updateOne', data)

            res.redirect(`/ingredients`)
        })
        .catch(error => console.error)
});

// An ingredient cannot be deleted

// router.delete('/:idIngredient', (req, res) => {
//     // we want to find the ingredientDoc
//     Ingredient.findById(req.params.idIngredient)
//         // then we want to delete the ingredientDoc
//         .then(ingredientDoc => {
//             if (req.user && ingredientDoc.user == req.user.id) {
//                 return ingredientDoc.deleteOne()
//             } else {
//                 res.send('something went wrong')
//             }
//         })
//         // then redirect the user
//         .then(data => {
//             console.log('returned from deleteOne', data)
//             res.redirect('/ingredients')
//         })
//         // catch any errors
//         .catch(error => console.error)
// })

module.exports = router;