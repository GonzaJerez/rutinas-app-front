import { routinesApi } from "../api/routinesApi";
import { WorkoutInRoutine } from '../interfaces/interfaces';

export interface createWorkoutInRoutineProps {
    idRoutine:  string,
    idDay:      string,
    form:       WorkoutInRoutine,
    token:      string
}

export interface UpdateWorkoutInRoutineProps extends createWorkoutInRoutineProps {
    idWorkoutInRoutine:string
}

export interface DeleteWorkoutInRoutineProps {
    idRoutine:          string;
    idDay:              string;
    idWorkoutInRoutine: string;
    token:              string
}


export const createWorkoutInRoutineInDB = async({idRoutine,idDay,form,token}:createWorkoutInRoutineProps)=>{

    const {sets,tool,workout} = form;
    const setToDB = sets.map( set => ({weight: set.weight, numReps: set.numReps}))

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}`,
        method: 'POST',
        token,
        body: {workout, tool, sets: setToDB}
    })
    
    return resp;
}


export const updateWorkoutInRoutineInDB = async({idRoutine,idDay,idWorkoutInRoutine,form,token}:UpdateWorkoutInRoutineProps)=>{

    const {sets,tool,workout} = form;
    const setToDB = sets.map( set => ({weight: set.weight, numReps: set.numReps}))

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}/${idWorkoutInRoutine}`,
        method: 'PUT',
        token,
        body: {workout, tool, sets:setToDB}
    })
    
    return resp;
}


export const deleteWorkoutInRoutineInDB = async({idRoutine,idDay,idWorkoutInRoutine,token}:DeleteWorkoutInRoutineProps)=>{

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}/${idWorkoutInRoutine}`,
        method: 'DELETE',
        token,
    })
    
    return resp;
}