import axios from 'axios'

const send = (payload) => {
    console.log('calling')
    console.log(payload)
    if (payload.verb === 'GET') {
        console.log('calling2')
        return axios.get(payload.url, payload.headers && { headers: payload.headers })
    }

    if (payload.verb === 'POST') {
        return axios.post(payload.url, payload.body, payload.headers && { headers: payload.headers })
    }

    if (payload.verb === 'PUT') {
        return axios.put(payload.url, payload.body, payload.headers && { headers: payload.headers })
    }

    if (payload.verb === 'DELETE') {
        return axios.delete(payload.url, payload.headers && { headers: payload.headers })
    }
}

export const HttpService = {
    send
}