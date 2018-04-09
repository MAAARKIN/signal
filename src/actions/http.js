import { HttpConstants } from '../constants'
import { HttpService } from '../services'

export const sendRequest = (request) => dispatch => {
    HttpService.send(request)
        .then(data => console.log(data))
}