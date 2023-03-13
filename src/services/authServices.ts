import axios from "../utils/config/axios.config";


/**
 * Login method
 * @param {string} email email to login a user
 * @param {string} password password to login a user
 * @returns 
 */
export const login = (email:string, password: string) => {
    // Declare body to POST
    let body =  {
        email,
        password
    }

    // send POST request to login endpoint
    return axios.post('/auth/login' , body)
} 

/**
 * Register Method
 * @param {string} name name of user
 * @param {string} email email of user
 * @param {string} password password of user
 * @param {number} age age of user
 * @returns 
 */
export const register = (name:string, email:string, password: string, age:number) => {
    // Declare body to POST
    let body =  {
        name,
        email,
        password,
        age
    }

    // send POST request to login endpoint
    return axios.post('/auth/register' , body)
} 