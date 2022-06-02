import { Set, WorkoutInRoutine, Workout, CombinedWorkout } from '../../interfaces/interfaces';
import uuid from 'react-native-uuid';


type ReducerActions = 
    | {type: 'setCombinedWorkouts', payload:{combinedWorkouts:CombinedWorkout}}

    // | {type: 'addWorkout',      payload:{workout:Workout}}
    | {type: 'deleteWorkout',   payload:{idWorkout:string}}
    | {type: 'changeWorkout',   payload:{idWorkout:string, tool:string}}

    | {type: 'addSet',          payload:{idWorkout:string}}
    | {type: 'deleteSet',       payload:{idWorkout:string, idSet:string}}
    | {type: 'changeSet',       payload:{idWorkout:string, idSet:string, form:Set}}


export const workoutInRoutinesReducer = (state:CombinedWorkout, action:ReducerActions) => {
    
    switch (action.type) {
        case 'setCombinedWorkouts':
            return {
                ...action.payload.combinedWorkouts
            }

        case 'deleteWorkout':
            return {
                ...state,
                combinedWorkouts: state.combinedWorkouts.filter( workout => workout._id !== action.payload.idWorkout && workout)
            }
            
        case 'changeWorkout':
            return {
                ...state,
                combinedWorkouts: state.combinedWorkouts.map( workout => workout._id !== action.payload.idWorkout
                    ? workout
                    : {
                        ...workout,
                        tool: action.payload.tool
                    }
                )
            }

        case 'addSet':
            return {
                ...state,
                combinedWorkouts: state.combinedWorkouts.map( workout => workout._id !== action.payload.idWorkout
                    ? workout
                    : {
                        ...workout,
                        sets: [...workout.sets, {
                            _id: uuid.v4().toString(),
                            numReps: '',
                            weight: ''
                        }]
                    }    
                )
            }

        case 'deleteSet':
            return {
                ...state,
                combinedWorkouts: state.combinedWorkouts.map( workout => workout._id !== action.payload.idWorkout
                    ? workout
                    : {
                        ...workout,
                        sets: workout.sets.filter( set => set._id !== action.payload.idSet && set )
                    }    
                )
            } 

        case 'changeSet':
            return {
                ...state,
                combinedWorkouts: state.combinedWorkouts.map( workout => workout._id !== action.payload.idWorkout
                    ? workout
                    : {
                        ...workout,
                        sets: workout.sets.map( set => set._id !== action.payload.idSet
                            ? set
                            : action.payload.form)
                    }
                )
            } 
    
        default:
            return state;
    }
}