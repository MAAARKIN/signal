import { HttpConstants } from '../constants'

export default (state = {}, action) => {
    switch (action.type) {
        case HttpConstants.REQUEST:
            return { ...state, request: action.request }
        case HttpConstants.RESPONSE:
            return { ...state, response: action.response }
        default:
            return state
    }
}