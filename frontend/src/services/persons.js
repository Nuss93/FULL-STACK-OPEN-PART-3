import axios from 'axios';
// import cors from 'cors';
const baseURL = '/api/persons';

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const createPerson = newPerson => {
    return axios.post(baseURL, newPerson).then(() => console.log('Operation success!'))
}

const deletePerson = id => {
    return axios.delete(`${baseURL}/${id}`).then(() => console.log('Delete success!'))
}

const updateNumber = (id, changedPerson) => {
    console.log('SERVICES', id, changedPerson)
    return axios.put(`${baseURL}/${id}`, changedPerson).then(() => console.log('Update success!'))
}

export default { getAll, createPerson, deletePerson, updateNumber }