import axios from 'axios'

const send = (payload) => {
    console.log('calling')
    console.log(payload)
    if (payload.verb === 'GET') {
        console.log('calling2')
        return axios.get(payload.url)
    }

    if (payload.verb === 'POST') {
        return axios.post(payload.url, payload.body)
    }

    if (payload.verb === 'PUT') {
        return axios.put(payload.url, payload.body)
    }

    if (payload.verb === 'DELETE') {
        return axios.delete(payload.url)
    }
}

export const HttpService = {
    send
}