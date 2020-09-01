import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(baseUrl)
}

const createPerson = newObject => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
        return axios.delete(`${baseUrl}/${id}`)
    }
}

const updatePerson = (objectUpdate, name, id) => {
    if (window.confirm(`${name} already exists change phone number? `)) {
        return axios.put(`${baseUrl}/${id}`, objectUpdate)
    }
}
export default {
    getPersons,
    createPerson,
    deletePerson,
    updatePerson
}