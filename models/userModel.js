  
import { post } from "../helpers/requester.js";
import { appKey } from "../helpers/storage.js";


export function register(data) {
    return post(`user/${appKey}/`, data)
}

export function login(data) {
    return post(`user/${appKey}/login`, data)
}

export function logout() {
    return post(`user/${appKey}/_logout`)
}