import uuid from 'react-native-uuid';
import { Set, CombinedWorkout } from '../../interfaces/interfaces';


type ReducerActions = 
    | {type: 'setCombinedWorkouts', payload:{combinedWorkout:CombinedWorkout}}

    // | {type: 'addWorkout',      payload:{workout:Workout}}
    | {type: 'deleteWorkout',   payload:{idWorkout:string}}
    | {type: 'changeWorkout',   payload:{idWorkout:string, value:string, field:'tool' | 'mode'}}

    | {type: 'addSet',          payload:{idWorkout:string}}
    | {type: 'deleteSet',       payload:{idWorkout:string, idSet:string}}
    | {type: 'changeSet',       payload:{idWorkout:string, idSet:string, form:Set}}


export const workoutInRoutinesReducer = (state:CombinedWorkout, action:ReducerActions) => {
    
    switch (action.type) {
        case 'setCombinedWorkouts':
            return {
                ...action.payload.combinedWorkout
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
                        [action.payload.field]: action.payload.value
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
                            weight: '',
                            isDescending: false
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