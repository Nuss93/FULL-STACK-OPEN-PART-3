const express = require('express')
const app = express()

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

    console.log(id)
    console.log(phoneNumbers)

    res.status(204).end()
})

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})