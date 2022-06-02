import { routinesApi } from "../../api/routinesApi";
import { WorkoutInRoutine } from '../../interfaces/interfaces';

export interface createWorkoutInRoutineProps {
    idRoutine:          string,
    idDay:              string,
    idCombinedWorkouts: string;
    form:               WorkoutInRoutine,
    token:              string
}

export interface UpdateWorkoutInRoutineProps extends createWorkoutInRoutineProps {
    idWorkoutInRoutine:string
}

export interface DeleteWorkoutInRoutineProps {
    idRoutine:          string;
    idDay:              string;
    idCombinedWorkouts: string;
    idWorkoutInRoutine: string;
    token:              string
}


export const createWorkoutInRoutineInDB = async({idRoutine,idDay,form,token, idCombinedWorkouts}:createWorkoutInRoutineProps)=>{

    // Envia al backend un objeto con la prop "workout" que es un array de los ejercicios
    // A cada set de cada ejercicio le elimina el id provisorio

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}/${idCombinedWorkouts}`,
        method: 'POST',
        token,
        body: {
            sets: form.sets.map( set => ({weight: set.weight, numReps: set.numReps})),
            workout: form.workout,
            tool:form.tool
        }
    })
    
    return resp;
}


export const updateWorkoutInRoutineInDB = async({idRoutine,idDay,idCombinedWorkouts,idWorkoutInRoutine,form,token}:UpdateWorkoutInRoutineProps)=>{

    // const {sets,tool,workout} = form;
    // const setToDB = sets.map( set => ({weight: set.weight, numReps: set.numReps}))

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}/${idCombinedWorkouts}/${idWorkoutInRoutine}`,
        method: 'PUT',
        token,
        body: {
            sets: form.sets.map( set => ({weight: set.weight, numReps: set.numReps})),
            workout: form.workout,
            tool:form.tool
        }
    })
    
    return resp;
}


export const deleteWorkoutInRoutineInDB = async({idRoutine,idDay,idCombinedWorkouts,idWorkoutInRoutine,token}:DeleteWorkoutInRoutineProps)=>{

    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}${idCombinedWorkouts}/${idWorkoutInRoutine}`,
        method: 'DELETE',
        token,
    })
    
    return resp;
}