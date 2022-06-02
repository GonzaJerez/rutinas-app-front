import { routinesApi } from "../../api/routinesApi";
import { LoginData, RegisterData } from '../../interfaces/interfaces';


export const loginApi = async (body:LoginData) => {
    const resp = await routinesApi( {
        endpoint: '/auth/login',
        body,
        method: 'POST',
    } )

    return resp;
}

export const googleSignInApi = async(idToken:string)=>{
    const resp = await routinesApi({
        body: {idToken},
        endpoint: '/auth/google',
        method: 'POST',
    })

    return resp;
}

export const registerApi = async(body:RegisterData)=>{
    const resp = await routinesApi({
        endpoint: '/users',
        body,
        method: 'POST',
    })

    return resp;
}

export const validateAuth = async(token:string)=>{
    const resp = await routinesApi({
        endpoint: '/auth',
        method: 'GET',
        token
    })

    return resp;
}