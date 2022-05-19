import { routinesApi } from "../api/routinesApi";

export interface CreateDayRoutineProps {
    idRoutine:  string;
    token:      string
}

export interface DeleteDayRoutineProps extends CreateDayRoutineProps{
    idDay: string;
}

export const createDayRoutineInDB = async({idRoutine,token}:CreateDayRoutineProps )=>{

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}`,
        method: 'POST',
        token
    })
    
    return resp;
}


export const deleteDayRoutineInDB = async({idRoutine,idDay,token}:DeleteDayRoutineProps)=>{

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}`,
        method: 'DELETE',
        token,
    })
    
    return resp;
}