import {
    SET_CONTACT,
    SET_DETAIL_CONTACT,
    UPDATE_CONTACT,
    CLEAR_DETAIL,
    RESPONSE_CHANGE
} from '../types'

const initialState = {
    title: 'getcontact',
    allContact: null,
    detailContact: null,
    responseMessage: null
}

export default (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_CONTACT:
            return {
                ...state,
                allContact: payload
            }
        case SET_DETAIL_CONTACT:
            return {
                ...state,
                detailContact: payload
            }
        case UPDATE_CONTACT:
            
            break;
        case CLEAR_DETAIL:
            return {
                ...state,
                detailContact: null
            }
        case RESPONSE_CHANGE:
            return {
                ...state,
                responseMessage: payload
            }
        default:
            return state
    }
}