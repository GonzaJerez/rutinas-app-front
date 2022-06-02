import { routinesApi } from "../../api/routinesApi"
import { CombinedWorkout } from "../../interfaces/interfaces";

export interface CreateCombinedWorkoutProps {
    idRoutine:      string;
    idDay:          string;
    body:           CombinedWorkout;
    token:          string;
}

export interface UpdateCombinedWorkoutProps extends CreateCombinedWorkoutProps {
    idCombinedWorkouts: string;
}

export interface PatchWeightCombinedWorkoutProps {
    idRoutine:          string;
    idDay:              string;
    idCombinedWorkouts: string;
    newWeights:         number[];
    token:              string;
}

export interface DeleteCombinedWorkoutProps {
    idRoutine:          string;
    idDay:              string;
    idCombinedWorkouts: string;
    token:              string;
}


export const createCombinedWorkoutsApi = async({idRoutine,idDay,body,token}:CreateCombinedWorkoutProps)=>{
    
    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}`,
        method: 'POST',
        body: {
            combinedWorkouts: body.combinedWorkouts.map( workout => ({
                tool: workout.tool,
                workout: workout.workout,
                sets: workout.sets.map( set => ({weight: set.weight, numReps: set.numReps})),
            }))
        },
        token
    })

    return resp;
}

export const updateCombinedWorkoutsApi = async({idRoutine,idDay,idCombinedWorkouts,body,token}:UpdateCombinedWorkoutProps)=>{
    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}/${idCombinedWorkouts}`,
        method: 'PUT',
        body: {
            combinedWorkouts: body.combinedWorkouts.map( workout => ({
                tool: workout.tool,
                workout: workout.workout,
                sets: workout.sets.map( set => ({weight: set.weight, numReps: set.numReps})),
            }))
        },
        token
    })

    return resp;
}

export const patchWeightCombinedWorkoutsApi = async({idRoutine,idDay,idCombinedWorkouts,newWeights,token}:PatchWeightCombinedWorkoutProps)=>{
    const resp = await routinesApi({
        endpoint:`/routines/${idRoutine}/${idDay}/${idCombinedWorkouts}`,
        method: 'PATCH',
        body: {
            newWeights
        },
        token
    })

    return resp;
}

export const deleteCombinedWorkoutApi = async({idRoutine,idDay,idCombinedWorkouts,token}:DeleteCombinedWorkoutProps)=>{
    const resp = await routinesApi({
        endpoint: `/routines/${idRoutine}/${idDay}/${idCombinedWorkouts}`,
        method: 'DELETE',
        token
    })

    return resp;
}