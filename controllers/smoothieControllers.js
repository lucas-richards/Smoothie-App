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

let ingArr = []

router.post('/new', function(req,res) {
    const newIng = {}
    newIng.qty = req.body.qty 
    Ingredient.findById(req.body.ing)
        .then( ingredientDoc => {
            newIng.ing = ingredientDoc
            ingArr.push(newIng)
            console.log('ingArr',ingArr)
            res.redirect('/smoothies/new')
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
})


// new
router.get('/new', function(req, res) {
    Ingredient.find({}).sort('name')
    .then((ingredientDoc)=>{
        res.render('smoothies/new',{title:'New Smoothie', ingredients:ingredientDoc, ingArr});
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
    //reset edit array smoothie
    ingArrEdit = []
    req.body.user = req.user._id
    console.log('this is my body',req.body)
    Smoothie.create(req.body)
        .then(smoothieDoc => {
            ingArr.forEach((ing) => {
                smoothieDoc.ingredients.push(ing)
            })
            smoothieDoc.save();
            ingArr = []
            res.redirect(`/smoothies`)
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
})

// edit
let ingArrEdit = []

router.get('/:smoothieId/edit', function(req,res){
    Smoothie.findById(req.params.smoothieId).populate('ingredients.ing').exec()
        .then(smoothieDoc => {
            //if ingArrEdit is empty then assign the smoothie.ing value
            if(ingArrEdit.length === 0)ingArrEdit = smoothieDoc.ingredients
            Ingredient.find({})
                .then(ingredientDocs => {
                    console.log('this is my smoothie to be updated',smoothieDoc)
                    res.render('smoothies/edit',{
                        title:'Edit Smoothie',
                        smoothie: smoothieDoc,
                        ingredients: ingredientDocs,
                        ingArrEdit
                    })
                })
                .catch(err => {
                    console.log('==============err==================')
                    console.log(err)
                    return res.send('err creating - check terminal')
                })
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
})

//update edit page to show the new ingredient 
router.patch('/:smoothieId/edit', function(req,res){
    Ingredient.findById(req.body.ing)
        .then( ingredientDoc => {
            const newIng = {}
            newIng.qty = req.body.qty 
            newIng.ing = ingredientDoc
            ingArrEdit.push(newIng)
            res.redirect(`/smoothies/${req.params.smoothieId}/edit`)
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
})

// update smoothie
router.patch('/:smoothieId', function(req, res) {
    console.log('this is my req.body',req.body)
    Smoothie.findById(req.params.smoothieId)
        .then(smoothieDoc => {
            console.log('this is my smoothieDoc',smoothieDoc)
            if (req.user && smoothieDoc.user == req.user.id) {
                smoothieDoc.ingredients = ingArrEdit
                ingArrEdit = []
                smoothieDoc.save()
                return smoothieDoc.updateOne(req.body)
            } else {
                res.send('something went wrong')
            }
        })
        .then(data => {
            console.log('what is returned from updateOne', data)

            res.redirect(`/smoothies`)
        })
        .catch(error => console.error)
});
// delete


module.exports = router;