import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://simple-contact-crud.herokuapp.com',
});

export function getAllData() {
    return new Promise(async (res,rej) => {
        try {
            let {data, status} = await axiosInstance.get('/contact')
            if(status == 200) {
                console.log(data.data, data.message,'[ini message]')
                res({data: data.data, message: data.message})
            }
        } catch (error) {
            rej(error)
        }
    })
}
export function getOneData(id) {
    return new Promise(async (res,rej) => {
        try {
            let {data, status} = await axiosInstance.get(`/contact/${id}`)
            if(status == 200) {
                res({data: data.data, message: data.message})
            }
        } catch (error) {
            rej(error)
        }
    })
}
export function editData(id) {
    return new Promise(async (res,rej) => {
        try {
            let {data, status} = await axiosInstance.put(`/contact/${id}`)
            if(status == 201) {
                res({data: data.data, message: data.message})
            }
        } catch (error) {
            rej(error)
        }
    })
}
export function deleteData(id) {
    return new Promise(async (res,rej) => {
        try {
            let {data, status} = await axiosInstance.delete(`/contact/${id}`)
            if(status == 202) {
                res({message: data.message})
            }
        } catch (error) {
            rej(error)
        }
    })
}
export function addData(id, inputData) {
    return new Promise(async (res,rej) => {
        try {
            let {data, status} = await axiosInstance.post(`/contact/${id}`, inputData)
            if(status == 201) {
                res({message: data.message})
            }
        } catch (error) {
            rej(error)
        }
    })
}