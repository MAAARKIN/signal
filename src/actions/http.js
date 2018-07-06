import { HttpConstants } from '../constants'
import { HttpService } from '../services'

const addResponse = response => ({ type: HttpConstants.RESPONSE, response })
const addRequest = request => ({ type: HttpConstants.REQUEST, request })

export const sendRequest = (request) => dispatch => {
    dispatch(addRequest(request))
    HttpService.send(request)
    .then(res => {
        console.log(res)
        dispatch(addResponse(res))
    }).catch(error => {
        console.log(error)
        dispatch(addResponse(error.response))
    })
}