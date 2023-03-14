import { AxiosRequestConfig } from 'axios';
import axios from '../utils/config/axios.config';

export const getAllKatas = (token:string, limit?: number, page?: number) => {
   
    // http://localhost:8000/api/katas?page=1&limit=1
    // Add headers with JWT in x-access-token

    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            limit,
            page
        }
    }
    return axios.get('/katas', options)
}

export const getKataById = (token: string, id:string ) => {
    // http://localhost:8000/api/katas?id=
    // Add headers with JWT in x-access-token
    const options: AxiosRequestConfig = {
        headers: {
            'x-access-token': token
        },
        params: {
            id,
        }
    }
    return axios.get('katas', options)
}