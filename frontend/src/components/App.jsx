import React, { useState, useEffect } from 'react'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'
import personService from '../services/persons'
import { PopUpMessage } from './PopUpMessage'

const Filter = ({ handleSearch, search }) => {
  return (
    <div className="mb-4">
      Search : <input name="search" type="text" onChange={handleSearch} value={search} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  // form data controll
  const [ input, setNewInput ] = useState({ name: '', number: '' })
  const [ search, setSearch ] = useState('')
  const [errorMessage, setErrorMessage] = useState({ message: "Message", color: "success", display: false })

  useEffect(() => {
    console.log('effect')
    
    personService.getAll().then(response => {
      console.log(response);
      setPersons(response)
    })
  }, [])

  const handleChange = (evt) => {
    let newInput = {
      ...input,
      [evt.target.name] : evt.target.value
    }
    
    setNewInput(newInput)
  }
  const handleSearch = (evt) => {
    let newInput = evt.target.value
    
    setSearch(newInput)
  }

  const submitPerson = (event) => {
    event.preventDefault()

    let newPersons = [...persons]
    let newData = { ...input, id: newPersons.length + 1 }

    personService.createPerson(newData).then(() => {
      newPersons.push(newData)
      setPersons(newPersons)
      setNewInput({ name: '', number: '' })

      setErrorMessage({message:`Successfully added ${input.name}!`, color:"success", display:true})
      setTimeout(() => {
        setErrorMessage({ message: "", color: "success", display: false })
      }, 5000);
    }).catch(err => {
      console.log(err.response.data);
      setErrorMessage({message:err.response.data.error, color:"danger", display:true})
      setTimeout(() => {
        setErrorMessage({ message: "", color: "success", display: false })
      }, 10000);
    })
  }

  // ! This was the old version that overwrites a users phone number if the names arent unique
  const submitPersonV1 = (event) => {
    event.preventDefault()

    let CHECKER = persons.findIndex(a => a.name.toLowerCase() === input.name.toLowerCase())

    if(CHECKER !== -1){
      let r = window.confirm(`${input.name} is already added to the phonebook, do you want to replcae the old number with the new one?`)
      if(!r){ 
        setNewInput({ name: '', number: '' })
        return
      } else {
        let newPersons = [...persons]
        newPersons[CHECKER] = { ...persons[CHECKER], number : input.number }

        const PERSONS = newPersons[CHECKER]
        const changedPerson = { ...PERSONS, number : input.number }
        console.log('persons', PERSONS);

        console.log(CHECKER, PERSONS.id);
        console.log('sini', changedPerson, CHECKER);

        personService.updateNumber(PERSONS.id, changedPerson).then(() => {
          setPersons(newPersons)
          setNewInput({ name: '', number: '' })

          setErrorMessage({message:`Successfully updated ${input.name}!`, color:"success", display:true})
          setTimeout(() => {
            setErrorMessage({ message: "", color: "success", display: false })
          }, 5000);
        }).catch(err => {
          setErrorMessage({message:`The number for ${PERSONS.name} has already been deleted!`, color:"danger", display:true})
          setTimeout(() => {
            setErrorMessage({ message: "", color: "success", display: false })
          }, 5000);
        })
        return
      }
    }

    console.log('contingency');

    let newPersons = [...persons]
    let newData = { ...input, id: newPersons.length + 1 }
    newPersons.push(newData)

    personService.createPerson(newData).then(() => {
      setPersons(newPersons)
      setNewInput({ name: '', number: '' })

      setErrorMessage({message:`Successfully added ${input.name}!`, color:"success", display:true})
      setTimeout(() => {
        setErrorMessage({ message: "", color: "success", display: false })
      }, 5000);
    }).catch(err => {
      console.log(err.message);
    })
  }
  const deletePerson = data => {
    let r = window.confirm(`Are you sure you want to delete the contact ${data.name}?`)
    if(!r){ return }
    
    let newPersons = [...persons]

    personService.deletePerson(data.id).then(() => {
      let INDEX = persons.findIndex(a => a.id === data.id)
      newPersons.splice(INDEX, 1)
      setPersons(newPersons)

      setErrorMessage({message:`Deleted ${data.name}!`, color:"danger", display:true})
      setTimeout(() => {
        setErrorMessage({ message: "", color: "success", display: false })
      }, 5000);
    }).catch(err => {console.log(err.message)})
  }
  return (
    <div>
      <h2 className="m-0">Search Phonebook</h2>
      <Filter handleSearch={handleSearch} search={search} />

      <h2 className="m-0">Add New Contact</h2>
      <PersonForm submitPerson={submitPerson} handleChange={handleChange} input={input} />

      <h2>Phone Numbers</h2>
      <Persons persons={persons} search={search} deletePerson={deletePerson} />

      <PopUpMessage message={errorMessage} />
    </div>
  )
}

export default App