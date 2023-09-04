const express = require('express');
const router = express.Router();
const Smoothie = require('../models/smoothie');
const Ingredient = require('../models/ingredient');
const checkLogin = require('../config/ensureLoggedIn')

//array for the smoothies new page
let ingArr = []
//array for the smoothies edit page
let ingArrEdit = []

// index
router.get('/', function(req, res) {
    //reset edit array smoothie
    ingArrEdit = []
    console.log('reset ingArrEdit')
    
    Smoothie.find({}).populate('user').populate('reviews').populate('ingredients.ing')
        .then(smoothieDocs => {
            res.render('smoothies/index',{title:'SMOOTHIES', smoothies:smoothieDocs});
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
    
});



router.post('/new', checkLogin, function(req,res) {
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
router.get('/new', checkLogin, function(req, res) {
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

// new delete
router.delete('/new/:ingArrIdx', checkLogin, function(req,res){
    console.log('old ingArr', ingArr)
    console.log('this is the index', req.params.ingArrIdx)
    ingArr.splice(req.params.ingArrIdx,1)
    console.log('new ingArrEdit', ingArr)
    res.redirect(`/smoothies/new`)
})

// show
router.get('/:smoothieId', function(req, res) {
    Smoothie.findById(req.params.smoothieId).populate('ingredients.ing').populate('user').exec()
        .then(smoothieDoc => {
            let totalKcal = 0
            let totalP = 0
            let totalC = 0
            let totalF = 0
            let totalRating = 0
            smoothieDoc.ingredients.forEach(ing => {
                totalKcal += ing.ing.kcal
                totalP += ing.ing.protein
                totalC += ing.ing.carbs
                totalF += ing.ing.fat
            })
            smoothieDoc.reviews.forEach(rev => {
                totalRating += rev.rating
            })
            res.render('smoothies/show',{
                title:'', 
                smoothie:smoothieDoc, 
                totalKcal,
                totalP,
                totalC,
                totalF,
                totalRating
            });
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
});


// create

router.post('/', checkLogin, function(req, res) {
    
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

router.get('/:smoothieId/edit', checkLogin, function(req,res){
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
router.patch('/:smoothieId/edit', checkLogin, function(req,res){
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

// EDIT PAGE - delete ingredient
router.delete('/:smoothieId/edit/:ingArrEditIdx', checkLogin, function(req,res){
    console.log('old ingArrEdit', ingArrEdit)
    ingArrEdit.splice(req.params.ingArrEditIdx,1)
    console.log('new ingArrEdit', ingArrEdit)
    res.redirect(`/smoothies/${req.params.smoothieId}/edit`)
})

// update smoothie
router.patch('/:smoothieId', checkLogin, function(req, res) {
    console.log('this is my req.body',req.body)
    Smoothie.findById(req.params.smoothieId)
        .then(smoothieDoc => {
            if (req.user && smoothieDoc.user == req.user.id) {
                smoothieDoc.ingredients = ingArrEdit
                console.log('this is my smoothieDoc after reset',smoothieDoc)
                ingArrEdit = []
                smoothieDoc.save()
                return smoothieDoc.updateOne(req.body)
            } else {
                res.send('something went wrong')
            }
        })
        .then(data => {
            console.log('what is returned from updateOne', data)

            res.redirect(`/smoothies/${req.params.smoothieId}`)
        })
        .catch(error => console.error)
});

// delete smoothie
router.delete('/:smoothieId', checkLogin, function(req,res){
   Smoothie.deleteOne({_id:req.params.smoothieId})
    .then(smoothieDoc => {
        console.log('deleted smoothie', smoothieDoc)
        res.redirect('/smoothies')
    })
    .catch(error => console.error)
})


module.exports = router;