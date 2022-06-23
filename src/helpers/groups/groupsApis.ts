import { routinesApi, routinesApiFormData } from "../../api/routinesApi"
import { CreateGroup, User, PutGroup } from '../../interfaces/interfaces';

/**
 * INTERFACES APIS
 */
export interface GetGroupsProps {
    token:      string;
    page:       number;
    limit:      number;
}

export interface GetRoutinesGroupsProps {
    token:      string;
    idGroup:    string;
}

export interface CreateGroupProps {
    body:       CreateGroup;
    token:      string;
}

export interface PutGroupProps extends DeleteGroupProps {
    body:       PutGroup
}

export interface DeleteGroupProps {
    token:      string;
    idGroup:    string;
}

export interface GroupsUsersProps {
    token:      string;
    idGroup:    string;
    body: {
        users:  string[]
    }
}



/**
 * FUNCIONES APIS
 */
export const getGroupsApi = async({token,limit,page}:GetGroupsProps)=>{
    const resp = await routinesApi({
        endpoint: `/groups?page=${page}&limit=${limit}`,
        method: 'GET',
        token
    })

    return resp;
}

export const getRoutinesInGroupsApi = async({token, idGroup}:GetRoutinesGroupsProps)=>{
    const resp = await routinesApi({
        endpoint: `/groups/${idGroup}/routines`,
        method: 'GET',
        token
    })

    return resp;
}


export const createGroupApi = async({body,token}:CreateGroupProps) => {
    const resp = await routinesApi({
        endpoint: `/groups`,
        method: 'POST',
        body,
        token
    })

    return resp;
}


export const putGroupApi = async ({body,token,idGroup}:PutGroupProps) => {
    const resp = await routinesApiFormData({
        endpoint: `/groups/${idGroup}`,
        method: 'PUT',
        form: body,
        token
    })

    return resp;
}


export const deleteGroupApi = async({idGroup,token}:DeleteGroupProps) => {
    const resp = await routinesApi({
        endpoint: `/groups/${idGroup}`,
        method: 'DELETE',
        token
    })

    return resp;
}


export const addUsersToGroupApi = async({body,idGroup,token}:GroupsUsersProps) => {
    const resp = await routinesApi({
        endpoint: `/groups/${idGroup}/addUsers`,
        method: 'POST',
        token,
        body
    })

    return resp;
}


export const deleteUsersFromGroupApi = async ({body,idGroup,token}:GroupsUsersProps) => {
    const resp = await routinesApi({
        endpoint: `/groups/${idGroup}/deleteUsers`,
        method: 'DELETE',
        token,
        body
    })

    return resp;
}

export const leaveGroupApi = async ({idGroup, token}:DeleteGroupProps)=>{
    const resp = await routinesApi({
        endpoint: `/groups/${idGroup}/leaveGroup`,
        method: 'DELETE',
        token
    })

    return resp;
}