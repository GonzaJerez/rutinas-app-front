import { routinesApi } from "../../api/routinesApi";
import { UpdateEmail, UpdatePassword, UpdateProfile } from "../../interfaces/interfaces";

interface UpdateUserProps {
    uid:    string;
    token:  string;
    body:   UpdateProfile | UpdateEmail | UpdatePassword
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

/* export const updateUserEmailApi = async({uid, body, token}:UpdateUserProps) => {
    const resp = await routinesApi({
        endpoint: `/users/${uid}`,
        method:'PUT',
        token,
        body
    })

    return resp;
} */