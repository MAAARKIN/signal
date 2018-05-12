import { HttpConstants } from '../constants'
import { HttpService } from '../services'

const addResponse = response => ({ type: HttpConstants.RESPONSE, response })

export const sendRequest = (request) => dispatch => {
    HttpService.send(request)
    .then(res => {
        console.log(res)
        dispatch(addResponse(res))
    }).catch(error => {
        console.log(error)
        dispatch(addResponse(error.response))
    })
}