import { RoutineToCopy } from '../interfaces/interfaces';

export const deleteIdsRoutineCreation = (routine:RoutineToCopy) => {

    // Si existen days entonces les saca el id a c/u y retorna el resto del day
    if (routine.days) {
        routine.days = routine.days.map( day => {

            // Si existen workouts entonces les saca el id a c/u y retorna el resto del workout
            if(day.workouts){
                day.workouts = day.workouts.map( workout => {

                    // Si existen los sets entonces les saca el id a c/u y retorna el resto del set
                    if (workout.sets) {
                        workout.sets = workout.sets.map( set => ({numReps:set.numReps, weight: set.weight}))
                    }
                    
                    return {tool: workout.tool, workout:workout._id || '', sets: workout.sets}
                })
            }

            return {workouts: day.workouts}
        })
    }

    // delete routine._id

    return routine;
    
}