const mongoose = require('mongoose')

// console.log(process.argv)

if(process.argv.length < 3){
    console.log(' ')
    console.log(`  Please provide the password as an argument : node mongo.js <password>!!  `)
    console.log(' ')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nasreen_razak:${password}@cluster0.hhary.mongodb.net/phoneBook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// 1. Define schema for each people data point using mongoose.Schema({})
const peopleSchema = new mongoose.Schema({
    name: String,
    number: Number,
    id: String,
})

// 2. Create a people Model from the peopleSchema, using mongoose.model('Name', Schema)
const People = mongoose.model('People', peopleSchema)

if(process.argv.length > 3){
    const name = process.argv[3]
    const number = process.argv[4]
    // console.log(name, number)

    if(!number){
        console.log('Please insert number!')
        process.exit(2)
    }

    const people = new People({
        name: name,
        number: number,
    })
    people.save().then(() => {
        console.log(' ')
        console.log(`  Added ${name}'s number ${number} to phonebook!`)
        console.log(' ')
        mongoose.connection.close()
    })
} else {
    People.find({}).then(result => {
        console.log('==============================================')
        console.log(`               Fetched data                   `)
        console.log('==============================================')

        result.length > 0 ? result.forEach(data => {
            console.log(data)
        }) : console.log(`               No data available              `)

        console.log('==============================================')

        mongoose.connection.close()
    })
}