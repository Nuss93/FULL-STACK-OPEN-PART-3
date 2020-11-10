const express = require('express')
const app = express()
app.use(express.json())

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

    // console.log(phoneNumbers)

    res.status(204).end()
})

app.post('/api/persons', (req,res) => {
    const id = Math.floor(Math.random() * 10000)
    const name = req.body.name
    const number = req.body.number

    // console.log(req.body)

    if(!name || !number) {
        res.status(404).json('No data parsed to the request.').end()
        return
    }

    const store = {
        id: id,
        name: name,
        number: number
    }

    phoneNumbers.push(store)

    res.status(200).json({message:'ok'})
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})