import { routinesApi } from "../../api/routinesApi";
import { LoginData, RegisterData } from '../../interfaces/interfaces';

export interface SendEmailProps {
    emailUser:          string;
}

export interface SecurityCodeProps {
    emailUser:          string;
    securityCode:       string;
}

export interface NewPasswordProps {
    emailUser:          string;
    newPassword:        string;
}

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
        method: 'POST',
        body,
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

export const sendEmailToRecoverPasswordApi = async(body:SendEmailProps) => {
    const resp = await routinesApi({
        endpoint: '/auth/sendEmail',
        method:'POST',
        body
    })

    return resp;
}

export const validateSecurityCodeApi = async(body:SecurityCodeProps) => {
    const resp = await routinesApi({
        endpoint: '/auth/securityCode',
        method:'POST',
        body
    })

    return resp;
}

export const renewPasswordApi = async(body:NewPasswordProps) => {
    const resp = await routinesApi({
        endpoint: '/auth/renewPassword',
        method:'POST',
        body
    })

    return resp;
}