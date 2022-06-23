import { routinesApi, routinesApiFormData } from "../../api/routinesApi";
import { UpdateEmail, UpdatePassword, UpdateProfile } from "../../interfaces/interfaces";

export interface UpdateUserProps {
    uid:    string;
    token:  string;
    body:   UpdateEmail | UpdatePassword
}

export interface UpdateUserProfileProps {
    uid:    string;
    token:  string;
    body:   UpdateProfile
}

export const updateUserApi = async({uid,body,token}:UpdateUserProps)=>{

    const resp = await routinesApi({
        endpoint: `/users/${uid}`,
        method:'PUT',
        token,
        body
    })

    return resp;
}

export const updateUserProfileApi = async({uid,body,token}:UpdateUserProfileProps)=>{

    const resp = await routinesApiFormData({
        endpoint: `/users/${uid}`,
        method:'PUT',
        token,
        form:body
    })

    return resp;
}

/* export const updateUserEmailApi = async({uid, body, token}:UpdateUserProps) => {
    const resp = await routinesApi({
        endpoint: `/users/${uid}`,
        method:'PUT',
        token,
        body
    })

    return resp;
} */