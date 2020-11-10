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

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})