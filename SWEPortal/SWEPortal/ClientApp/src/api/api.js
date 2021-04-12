import axios from 'axios'

const baseUrl = "/api"

const apiBuilder = (resource) => {

    return {
        async getAll() {
            return await axios.get(`${baseUrl}/${resource}`)
        },

        async get(id) {
            return await axios.get(`${baseUrl}/${resource}/${id}`)
        },

        async create(model) {
            return await axios.post(`${baseUrl}/${resource}`, model)
        },

        async update(model) {
            return await axios.put(`${baseUrl}/${resource}`, model)
        },

        async delete(id) {
            return await axios.delete(`${baseUrl}/${resource}/${id}`)
        }
    }
}


export default apiBuilder