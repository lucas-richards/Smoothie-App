const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');
const Smoothie = require('../models/smoothie');
const checkLogin = require('../config/ensureLoggedIn')


const ROOT_URL = `https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
let ingData = null


// index
router.get('/', function(req, res) {
    
    Ingredient.find({}).sort('name')
        .then(nutrientsDocs => {
            res.render('ingredients/index', {
                title:'Ingredients',
                ingredients: nutrientsDocs,
            })
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })

});

// Search bar for new item 
router.get('/new-option', function(req, res) {
    res.render('ingredients/new-option',{title:'Select an option', ingData:''});
});

// Fetch data from search bar
router.post('/new-option', checkLogin, async function(req, res) {
    console.log('route hit search')
    ingData = await fetch(`${ROOT_URL}&ingr=${req.body.ing}&nutrition-type=cooking`)
        .then(res => res.json())
        
    res.render('ingredients/new-option',{title:'Select an option', ingData});
});

// Search bar for new item 
router.get('/new-search', function(req, res) {
    res.render('ingredients/new-search',{title:'Confirm data', ingData});
});


// new
router.get('/new', checkLogin, function(req, res) {
    res.render('ingredients/new',{title:'New Ingredient'});
});

// show
router.get('/:idIngredient', function(req, res) {
    Ingredient.findById(req.params.idIngredient)
        .then(ingredientDoc => {
            Smoothie.find({ 'ingredients.ing':req.params.idIngredient}).populate('ingredients.ing')
                .then(smoothieDocs => {
                    console.log('these are smoothies',smoothieDocs)
                    const total = ingredientDoc.protein + ingredientDoc.carbs + ingredientDoc.fat
                    res.render('ingredients/show',{title:'', ingredient:ingredientDoc, total, smoothies:smoothieDocs});
                })
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
});


// create

router.post('/', checkLogin, function create(req,res){
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

router.get('/:idIngredient/edit', checkLogin, function(req, res) {
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

router.patch('/:idIngredient', checkLogin, function(req, res) {
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

            res.redirect(`/ingredients/${req.params.idIngredient}`)
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