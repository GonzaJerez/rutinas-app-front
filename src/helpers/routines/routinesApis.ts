import { routinesApi } from "../../api/routinesApi"
import { GetRoutines, Routine, RoutineCreateState } from "../../interfaces/interfaces";
import { deleteIdsRoutineCreation } from "../deleteIdsRoutineCreation";

export interface GetRoutinesProps {
    page:  number;
    limit: number;
    token: string;
}

export interface CreateRoutineProps {
    body:   RoutineCreateState;
    token:  string;
}

export interface UpdateRoutineProps extends CreateRoutineProps {
    idRoutine: string;
}

export interface DeleteRoutineProps {
    idRoutine:  string;
    token:      string;
}

export interface CreateCopyProps {
    idRoutine:  string;
    token:      string;
}

export const getRoutinesFromDB = async({page,limit,token}:GetRoutinesProps) => {

    const resp = await routinesApi({
        endpoint: `/routines?page=${page}&limit=${limit}`,
        method:'GET',
        token
    })

    return resp;
}

export const createRoutineInDB = async({body, token}:CreateRoutineProps)=>{
    
    const resp = await routinesApi({
        endpoint:'/routines',
        method: 'POST',
        body,
        token
    })
    
    return resp;
}

export const updateRoutineInDB = async({idRoutine,body,token}:UpdateRoutineProps) => {
    const resp = await routinesApi({
        endpoint: `/routines/${idRoutine}`,
        method: 'PUT',
        body,
        token
    })

    return resp;
}

export const deleteRoutineInDB = async({idRoutine,token}:DeleteRoutineProps)=>{

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}`,
        method: 'DELETE',
        token,
    })
    
    return resp;
}

export const createCopyRoutineApi = async({idRoutine,token}:CreateCopyProps) => {
    
    const resp = await routinesApi({
        endpoint:`/routines/copy/${idRoutine}`,
        method: 'POST',
        token
    })
    
    return resp;
}