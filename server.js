// const { pass } = require('./config.js')
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')
const People = require('./models/people')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

let phoneNumbers = [
    {
        id: 1,
        name: 'Arto Hellart',
        number: '0123456789'
    },
    {
        id: 2,
        name: 'Camilla Cabello',
        number: '32781263521'
    },
    {
        id: 3,
        name: 'Jamilla Jamayo',
        number: '1234523423'
    },
    {
        id: 4,
        name: 'Sayu Amati',
        number: '666666666'
    },
]

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
app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id

    People.findById(id).then(result => {
        console.log(result)
    
        res.status(200).json(result)
    }).catch(err => {
        res.status(404).send({ message : 'Error! User with this id does not exist!' }).end()
    })
})

// ! @route DELETE api/persons/:id
// ! @desc Delete one person's phone number
// ! @access Public
app.delete('/api/persons/:id', (req,res) => {
    const id = req.params.id

    People.findByIdAndRemove(id).then(() => {
        res.status(200).send({ message : `Successfully deleted user ${id}!` })
    }).catch(err => {
        console.log(err.message)
        res.status(404).send({ message : 'Error! User with this id does not exist!' }).end()
    })
})

morgan.token('posted-data', (req, res, param) => {
    return JSON.stringify(req.body)
});
app.use(morgan(':posted-data'))

// ! @route POST api/persons/:id
// ! @desc Post one person's phone number
// ! @access Public
app.post('/api/persons', (req,res) => {
    console.log(req.body)
    // const id = Number(req.body.id)
    const name = req.body.name
    const number = req.body.number

    if(!name || name === "") {
        res.status(400).json({error : 'Please input name'}).end()
        return
    }
    if(!number || number === "") {
        res.status(400).json({error : 'Please input phone number'}).end()
        return
    }

    // Check uniqueness of the name
    People.find({ name : name }).then(result => {
        if(result.length !== 0){
            res.status(400).json({error : 'Name must be unique'}).end()
            return
        } else {
            const store = new People({
                name: name,
                number: number
            })

            store.save().then(result => {
                console.log(`Contact ${name} successfully saved!`)
                res.status(200).json({message:'ok', data:store})
            })
        }
    })
})

app.put('/api/persons/:id', (req,res) => {
    const id = req.params.id
    const number = req.body.number

    if(!number || number === "") {
        res.status(400).json({error : 'Please input phone number'}).end()
        return
    }

    People.findByIdAndUpdate(id, { number : number }).then(result => {
        res.status(200).json({message:'ok', data:req.body})
    }).catch(err => {
        console.log(err.message)
        res.status(400).send(`Error updating number for user ${id}! User doesnt exist.`)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error : 'Error! Unknown endpoint!' })
    console.log('Response :', response)
    console.log('---')
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})