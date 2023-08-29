const express = require('express');
const router = express.Router();
const Smoothie = require('../models/smoothie');
const Ingredient = require('../models/ingredient');

// index
router.get('/', function(req, res) {
    Smoothie.find({})
        .then(smoothieDocs => {
            res.render('smoothies/index',{title:'Smoothies', smoothies:smoothieDocs});
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
    
});



// new

router.get('/new', function(req, res) {
    Ingredient.find({}).sort('name')
    .then((ingredientDoc)=>{
        res.render('smoothies/new',{title:'New Smoothie', ingredients:ingredientDoc});
    })
    .catch(err => {
        console.log('==============err==================')
        console.log(err)
        return res.send('err creating - check terminal')
    })
});

// show
router.get('/:smoothieId', function(req, res) {
    Smoothie.findById(req.params.smoothieId).populate('ingredients.ing').populate('user').exec()
        .then(smoothieDoc => {
            let totalKcal = 0
            let totalP = 0
            let totalC = 0
            let totalF = 0
            smoothieDoc.ingredients.forEach(ing => {
                totalKcal += ing.ing.kcal
                totalP += ing.ing.protein
                totalC += ing.ing.carbs
                totalF += ing.ing.fat
            })
            console.log('This is my smoothie ing',smoothieDoc)
            res.render('smoothies/show',{
                title:'', 
                smoothie:smoothieDoc, 
                totalKcal,
                totalP,
                totalC,
                totalF
            });
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
});


// create

router.post('/', function(req, res) {
    req.body.user = req.user._id
    console.log('this is my body',req.body)
    Smoothie.create(req.body)
        .then(smoothieDoc => {
            console.log('this is my new smoothie',smoothieDoc)
            smoothieDoc.save();
            res.redirect(`/smoothies`)
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
})
// edit

router.get('/:smoothieId/edit', function(req,res){
    Smoothie.findById(req.body.smoothieId)
        .then(smoothieDoc => {
            res.render(`smoothies/${smoothieDoc._id}`)
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
})
// update
// delete


module.exports = router;