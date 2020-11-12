import React from 'react'
import personService from '../services/persons'

const Persons = ({ persons, search, deletePerson }) => {
    const filteredData = persons.filter(a => a.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    
    
    return (
        <ul>
            {filteredData.map((data,index) => <li key={index} className="mb-2">{data.name} {data.number} <button className="btn btn-sm btn-danger" onClick={() => {deletePerson(data)}}>Delete</button></li>)}
        </ul>
    )
}

export default Persons
