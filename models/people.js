require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
// 1. Define schema for each people data point using mongoose.Schema({})
const peopleSchema = new mongoose.Schema({
    name: String,
    number: String,
})
peopleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// 2. Create a people Model from the peopleSchema, using mongoose.model('Name', Schema)
const People = mongoose.model('People', peopleSchema)

module.exports = People