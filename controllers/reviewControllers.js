const express = require('express');
const router = express.Router();
const Smoothie = require('../models/smoothie');

module.exports = router

router.delete('/reviews/:reviewId',function(req, res) {
    // Note the cool "dot" syntax to query on the property of a subdoc
    console.log('delete route was hit')
    Smoothie.findOne({ 'reviews._id': req.params.reviewId, 'reviews.user': req.user._id })
        .then(smoothieDoc => {
            // Remove the review using the remove method available on Mongoose arrays
            console.log('this is smoothieDococ',smoothieDoc)
            smoothieDoc.reviews.remove(req.params.reviewId);
            smoothieDoc.save();
            res.redirect(`/smoothies/${smoothieDoc._id}`);
        })
        .catch (err => {
            console.log(err);
        })
    
})

router.post('/smoothies/:smoothieId/reviews', function (req, res) {
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    Smoothie.findById(req.params.smoothieId)
        .then(smoothieDoc => {
            // We can push (or unshift) subdocs into Mongoose arrays
            smoothieDoc.reviews.push(req.body)
            return smoothieDoc.save()
        })
        .then(smoothieDoc => {
            res.redirect(`/smoothies/${smoothieDoc._id}`);
        })
        .catch (err => {
            console.log(err);
        })
})