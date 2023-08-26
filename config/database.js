//  first require the mognoose module
const mongoose = require('mongoose')

// now we establish our connection to the database
mongoose.connect(process.env.DATABASE_URL)

// we want to save our connection to a variable, for a quick shorthand reference that we will use later
const db = mongoose.connection

// tell what to do once a connection is established
db.on('connected', function() {
    console.log(`Connected to MongoDb ${db.name} at ${db.host}:${db.port}`)
})

// this exports the newly updated mongoose object
// we'll use this later
module.exports = mongoose