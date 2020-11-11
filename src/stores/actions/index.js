import {
    SET_CONTACT,
    SET_DETAIL_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    CLEAR_DETAIL,
    RESPONSE_CHANGE
} from '../types'
import {
    getAllData,
    getOneData,
    addData,
    editData,
    deleteData
} from '../api'

export function addContact (id, inputData) {
    return async (dispatch) => {
        try {
            let {message} = await addData(id, inputData)

            dispatch({
                type: RESPONSE_CHANGE,
                payload: message
            })
        } catch (error) {
            console.log('=====ERROR DI ADD NEW CONTACT=====',error)
        }
    }
}
export function getAllContact () {
    return async (dispatch) => {
        try {
            let {data, message} = await getAllData()
            console.log(data, message)
            
            dispatch({
                type: SET_CONTACT,
                payload: data
            })
            dispatch({
                type: RESPONSE_CHANGE,
                payload: message
            })
            dispatch({
                type: CLEAR_DETAIL
            })
        } catch (error) {
            console.log('=====ERROR DI GET ALL CONTACT=====',error)
        }
    }
}
export function getOneContact (id) {
    return async (dispatch) => {
        try {
        let {data, message} = await getOneData(id)
        
        dispatch({
            type: SET_DETAIL_CONTACT,
            payload: data
        })
        dispatch({
            type: RESPONSE_CHANGE,
            payload: message
        })
        dispatch({
            type: RESPONSE_CHANGE,
            payload: message
        })
        dispatch
        } catch (error) {
            console.log('=====ERROR DI GET ONE CONTACT=====',error)
        }
    }
}
export function updateContact (id) {
    return async (dispatch) => {
        try {
            let {data, message} = await editData(id)

            dispatch({
                type: RESPONSE_CHANGE,
                payload: message
            })
            dispatch({
                type: SET_DETAIL_CONTACT,
                payload: data
            })

            console.log(data)
        } catch (error) {
            console.log('=====ERROR DI EDIT CONTACT=====',error)
        }
    }
}
export function deleteContact (id) {
    return async (dispatch) => {
        try {
            let {message} = await addData(id)
            
            dispatch({
                type: RESPONSE_CHANGE,
                payload: message
            })
        } catch (error) {
            console.log('=====ERROR DI DELETE CONTACT=====',error)
        }
    }
}