const express = require('express');
const router = express.Router();
const Smoothie = require('../models/smoothie');

// index
router.get('/', function(req, res) {
    const smoothies = Smoothie.find({})
    res.render('smoothies/index',{title:'Smoothies', smoothies});
});

// show
router.get('/show', function(req, res) {
    Smoothie.find({_id:req.params.id})
        .then(smoothieDoc => {
            console.log('This is my smoothie',smoothieDoc)
            res.render('smoothies/show',{title:'Smoothie', smoothie:smoothieDoc});
        })
        .catch(err => {
            console.log('==============err==================')
            console.log(err)
            return res.send('err creating - check terminal')
        })
});

// new

router.get('/new', function(req, res) {
    res.render('smoothies/new',{title:'New Smoothie'});
});
// create
// edit
// update
// delete


module.exports = router;