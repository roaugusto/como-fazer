const axios = require('axios')
const baseURL = 'https://como-fazer-faeb6.firebaseio.com/'
const auth = 'YIWzWd3O0MzkeD3dD3fOmmwP6uB26CzIo68s2jrM'

const list = async (key) => {
    const content = await axios.get(baseURL + key + '.json?auth='+auth)
    if (content.data) {
        const objetos = Object
            .keys(content.data)
            .map(key => {
                return {
                    id: key,
                    ...content.data[key]
                }
            })
        return objetos
    } else {
        return []
    }
}
const apagar = async (key, id) => {
    await axios.delete(baseURL + key + '/' + id + '.json?auth='+auth)
    return true
}
const get = async (key, id) => {
    const content = await axios.get(`${baseURL}/${key}/${id}.json?auth=${auth}`)
    return {
        id: id,
        ...content.data
    }

}
const update = async (key, id, data) => {
    await axios.put(`${baseURL}/${key}/${id}.json?auth=${auth}`, data)
    return true;
}
const create = async (key, data) =>{
    await axios.post(`${baseURL}/${key}.json?auth=${auth}`, data)
    return true;
}
module.exports = {
    list, apagar, get, update, create
}