const cors = require('cors')
const express = require('express')
const app = express()
const morgan = require('morgan')
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

app.get('/api/persons', (req,res) => {
    res.json(phoneNumbers)
})

app.get('/info', (req,res) => {
    const count = phoneNumbers.length
    const time = new Date()
    res.send(`Phone book has info for ${count} people<br/><br/>${time}`)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = phoneNumbers.find(a => a.id === id)
    console.log(person)

    if(person){
        res.status(200).json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    phoneNumbers = phoneNumbers.filter(a => a.id !== id)

    res.status(204).end()
})

morgan.token('posted-data', (req, res, param) => {
    return JSON.stringify(req.body)
});

// app.use(morgan(':posted-data'))

app.post('/api/persons', (req,res) => {
    console.log(req.body)
    const id = Number(req.body.id)
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
    if(phoneNumbers.find(a => a.name.toLowerCase() === name)){
        res.status(400).json({error : 'Name must be unique'}).end()
        return
    }

    const store = {
        id: id,
        name: name,
        number: number
    }

    phoneNumbers.push(store)

    res.status(200).json({message:'ok', data:store})
})

app.put('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const number = req.body.number
    const person = phoneNumbers.findIndex(a => a.id === id)

    phoneNumbers[person] = {...phoneNumbers[person], number:number}
    res.status(200).json({message:'ok', data:req.body})
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})