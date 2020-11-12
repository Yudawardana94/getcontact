import {
    SET_CONTACT,
    SET_DETAIL_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    CLEAR_DETAIL,
    RESPONSE_CHANGE,
    SEARCH_CONTACT
} from '../types'
import {
    getAllData,
    getOneData,
    addData,
    editData,
    deleteData
} from '../api'

export function addContact (inputData, navigation) {
    return async (dispatch) => {
        try {
            inputData.age = Number(inputData.age)
            let {message} = await addData(inputData)
            let {data} = await getAllData()
            
            dispatch({
                type: SET_CONTACT,
                payload: data
            })
            dispatch({
                type: RESPONSE_CHANGE,
                payload: message
            })
            navigation.goBack()
        } catch (error) {
            console.log('=====ERROR DI ADD NEW CONTACT=====',error)
        }
    }
}
export function getAllContact () {
    return async (dispatch) => {
        try {
            let {data, message} = await getAllData()
            
            let separatedContact = {}

            data.forEach((el) => {
                let firstLetter = el.firstName[0]

                if(separatedContact[firstLetter] == undefined) {
                    separatedContact[firstLetter] = []
                }
                separatedContact[firstLetter].push(el)
            })

            dispatch({
                type: SET_CONTACT,
                payload: Object.entries(separatedContact)
            })
            dispatch({
                type: SEARCH_CONTACT,
                payload: null
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
export function updateContact (id, inputData, navigation) {
    return async (dispatch) => {
        try {
            inputData.age = Number(inputData.age)
            let {data, message} = await editData(id, inputData)

            if(data) {
                navigation.goBack()
            }
            dispatch({
                type: RESPONSE_CHANGE,
                payload: message
            })
            dispatch({
                type: SET_DETAIL_CONTACT,
                payload: data
            })
        } catch (error) {
            console.log('=====ERROR DI EDIT CONTACT=====',error)
        }
    }
}
export function deleteContact (id, navigation) {
    return async (dispatch) => {
        try {
            let {message} = await deleteData(id)
            
            dispatch({
                type: RESPONSE_CHANGE,
                payload: message
            })
            navigation.goBack()
        } catch (error) {
            console.log('=====ERROR DI DELETE CONTACT=====',error)
            dispatch({
                type: RESPONSE_CHANGE,
                payload: 'Unable to delete contact.'
            })
        }
    }
}
export function searchContact(input) {
    return async (dispatch) => {
        try {
            let {data, message} = await getAllData()
            
            let filteredSearch = data.filter((el) => {
                return el.firstName.toLowerCase().includes(input.toLowerCase()) || el.lastName.toLowerCase().includes(input.toLowerCase())
            })
            
            dispatch({
                type: SEARCH_CONTACT,
                payload: filteredSearch
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