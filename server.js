require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')
const People = require('./models/people')
const uniqueValidator = require('mongoose-unique-validator');

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use(morgan('tiny'))

// ! @route GET api/persons
// ! @desc Get full list
// ! @access Public
app.get('/api/persons', (req,res) => {
    People.find({}).then(result => {
        result.length > 0 ? result.forEach(data => {
            console.log(data)
        }) : console.log(`No data available`)

        res.json(result) 
    })
})

// ! @route GET info
// ! @desc Get info
// ! @access Public
app.get('/info', (req,res) => {
    People.find({}).then(result => {
        const count = result.length
        const time = new Date()
        res.send(`Phone book has info for ${count} people<br/><br/>${time}`)
    })
})

// ! @route GET api/persons/:id
// ! @desc Get one person's phone number
// ! @access Public
app.get('/api/persons/:id', (req,res,next) => {
    const id = req.params.id

    People.findById(id).then(result => {
        console.log(result)
    
        res.status(200).json(result)
    }).catch(err => next(err))
})

// ! @route DELETE api/persons/:id
// ! @desc Delete one person's phone number
// ! @access Public
app.delete('/api/persons/:id', (req,res,next) => {
    const id = req.params.id

    People.findByIdAndRemove(id).then(() => {
        res.status(200).send({ message : `Successfully deleted user ${id}!` })
    }).catch(err => next(err))
})


morgan.token('posted-data', (req, res, param) => {
    return JSON.stringify(req.body)
});
app.use(morgan(':posted-data'))

// ! @route POST api/persons/:id
// ! @desc Post one person's phone number
// ! @access Public
app.post('/api/persons', (req,res,next) => {
    console.log(req.body)
    // const id = Number(req.body.id)
    const name = req.body.name
    const number = req.body.number

    const store = new People({
        name: name,
        number: number
    })

    store.save()
    .then(result => result.toJSON())
    .then(result => {
        console.log(`Contact ${name} successfully saved!`)
        res.status(200).json({message:'ok', data:store})
    })
    .catch(err => next(err))

    // if(!name || name === "") {
    //     res.status(400).json({error : 'Please input name'}).end()
    //     return
    // }
    // if(!number || number === "") {
    //     res.status(400).json({error : 'Please input phone number'}).end()
    //     return
    // }

    // Check uniqueness of the name
    // People.find({ name : name }).then(result => {
    //     if(result.length !== 0){
    //         res.status(400).json({error : 'Name must be unique'}).end()
    //         return
    //     } else {
    //         const store = new People({
    //             name: name,
    //             number: number
    //         })

    //         store.save()
    //         .then(result => result.toJSON())
    //         .then(result => {
    //             console.log(`Contact ${name} successfully saved!`)
    //             res.status(200).json({message:'ok', data:store})
    //         })
    //         .catch(err => next(err))
    //     }
    // })
})

// app.put('/api/persons/:id', (req,res,next) => {
//     const id = req.params.id
//     const number = req.body.number

//     if(!number || number === "") {
//         res.status(400).json({error : 'Please input phone number'}).end()
//         return
//     }

//     People.findByIdAndUpdate(id, { number : number }, { new : true }).then(result => {
//         res.status(200).json({message:'ok', data:req.body})
//     }).catch(err => {
//         next(err)
//     })
// })

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error : 'Error! Unknown endpoint!' })
    console.log('Response :', response)
    console.log('---')
}

// * Handler for requests with unknown endpoints
app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
    console.log('aaa',error.message, error.name)

    if(error.name === 'CastError'){
        return res.status(400).send({ error: 'Malformatted id' })
    }
    if(error.name === 'ValidationError'){
        return res.status(400).send({ error: error.message })
    }
    next(error)
}

// * Handler for requests with results to errors
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})