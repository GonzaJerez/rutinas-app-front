import { CombinedWorkout, Routine, RoutineCreateState, WorkoutInRoutine } from '../../interfaces/interfaces';
import uuid from 'react-native-uuid';

export interface StateProps {
    listRoutines:       Routine[];
    actualRoutine:      Routine | null;
    actualCombinedWorkouts: CombinedWorkout | null;
    error:              string;
}

export const initialState:StateProps = {
    listRoutines: [],
    actualRoutine: null,
    actualCombinedWorkouts: null,
    error: '',
}

type ActionsProps = 
    | {type: 'addRoutinesToListRoutines',    payload: {routines:Routine[]}}
    | {type: 'addNewRoutine',      payload:{routine:Routine}}
    | {type: 'updateListRoutines', payload: {routine:Routine}}
    | {type: 'setListRoutines',    payload: {routines:Routine[]}}
    | {type: 'setActualRoutine',   payload: {routine:Routine}}
    | {type: 'updateActualRoutine',payload: {idDay:string, combinedWorkouts:CombinedWorkout[]}}
    | {type: 'updateRoutine',      payload: {routine:Routine}}
    | {type: 'deleteRoutine',      payload: {idRoutine:string}}
    | {type: 'setError',           payload:string}
    | {type: 'clearActualRoutine'}
    | {type: 'setActualCombinedWorkouts',   payload:{combinedWorkouts:CombinedWorkout}}
    | {type: 'clearActualCombinedWorkouts'}


export const RoutinesReducer = (state:StateProps, action:ActionsProps):StateProps =>{

    switch (action.type) {
        case 'addRoutinesToListRoutines':
            return {
                ...state,
                listRoutines: [...state.listRoutines,...action.payload.routines ]
            }

        case 'addNewRoutine':
            return {
                ...state,
                listRoutines: [action.payload.routine, ...state.listRoutines]
            }

        case 'setActualRoutine':
            return {
                ...state,
                actualRoutine: action.payload.routine,
            }

        case 'updateActualRoutine':
            return {
                ...state,
                actualRoutine : {
                    ...state.actualRoutine!,
                    days: state.actualRoutine!.days.map( day => day._id.toString() !== action.payload.idDay 
                        ? day
                        : {...day, workouts:action.payload.combinedWorkouts}
                    )
                },
            } 

        case 'updateRoutine':
            return {
                ...state,
                // actualRoutine: null,
                listRoutines: state.listRoutines.map( routine => routine._id !== action.payload.routine._id 
                    ? routine
                    : action.payload.routine
                )
                // .sort( (a,b) => b.modifyDate - a.modifyDate)
            }

        case 'deleteRoutine':
            return {
                ...state,
                listRoutines: state.listRoutines.filter( routine => routine._id !== action.payload.idRoutine && routine)
            }
            
        case 'clearActualRoutine':
        return {
            ...state,
            actualRoutine: null
        }

        case 'setError':
            return {
                ...state,
                error: action.payload
            }

        case 'setActualCombinedWorkouts':
            return {
                ...state,
                actualCombinedWorkouts: action.payload.combinedWorkouts
            }
        
        case 'clearActualCombinedWorkouts':
            return {
                ...state,
                actualCombinedWorkouts: null
            }
    
        default:
            return state;
    }
}