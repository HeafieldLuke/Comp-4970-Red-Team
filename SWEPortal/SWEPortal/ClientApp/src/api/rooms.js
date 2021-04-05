import axios from 'axios'

const baseUrl = "https://localhost:5001/api"

const apiBuilder = (resource) => {

    return {
        async getAll() {
            return await axios.get(`${baseUrl}/${resource}`)
        },

        async get(id) {
            return await axios.get(`${baseUrl}/${resource}/${id}`)
        },

        async create(room) {
            return await axios.post(`${baseUrl}/${resource}`, room)
        },

        async update(room) {
            return await axios.put(`${baseUrl}/${resource}`, room)
        },

        async delete(id) {
            return await axios.delete(`${baseUrl}/${resource}/${id}`)
        }
    }
}


export default apiBuilder