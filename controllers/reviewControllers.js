const express = require('express');
const router = express.Router();
const Smoothie = require('../models/smoothie');

module.exports = router

// router.delete deleteReview(req, res) {
//   // Note the cool "dot" syntax to query on the property of a subdoc
//   const movie = await Movie.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id });
//   // Rogue user!
//   if (!movie) return res.redirect('/movies');
//   // Remove the review using the remove method available on Mongoose arrays
//   movie.reviews.remove(req.params.id);
//   // Save the updated movie doc
//   await movie.save();
//   // Redirect back to the movie's show view
//   res.redirect(`/movies/${movie._id}`);
// }

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