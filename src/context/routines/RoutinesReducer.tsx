import { Routine, RoutineCreateState } from "../../interfaces/interfaces"
import uuid from 'react-native-uuid';

export interface StateProps {
    listRoutines:   Routine[];
    actualRoutine:  Routine | null;
    error:         string;
}

export const initialState:StateProps = {
    listRoutines: [],
    actualRoutine: null,
    error: ''
}

type ActionsProps = 
    | {type: 'setListRoutines',  payload: {routines:Routine[]}}
    | {type: 'setActualRoutine', payload: {routine:Routine}}
    | {type: 'updateRoutine',    payload: {routine:Routine}}
    | {type: 'deleteRoutine',    payload: {idRoutine:string}}
    | {type: 'setError',         payload:string}
    | {type: 'clearActualRoutine'}
    // | {type: 'clearErrors'}
    // | {type: 'addNewRoutine', payload: {routine:Routine}}
    // | {type: 'updateListRoutines', payload: {routine:Routine}}
    // | {type: 'addNewDayRoutine'}
    // | {type: 'deleteDayRoutine', payload: {idDay:string}}
    // | {type: 'addNewWorkoutInRoutine', payload: {idDay:string, form:WorkoutInRoutineState}}
    // | {type: 'updateWorkoutInRoutine', payload: {idDay:string, idWorkoutInRoutine:string, form:WorkoutInRoutineState}}
    // | {type: 'deleteWorkoutInRoutine', payload: {idDay:string, idWorkoutInRoutine:string}}



export const RoutinesReducer = (state:StateProps, action:ActionsProps):StateProps =>{

    switch (action.type) {
        case 'setListRoutines':
            return {
                ...state,
                listRoutines: [...action.payload.routines, ...state.listRoutines ]
            }

        case 'setActualRoutine':
            return {
                ...state,
                actualRoutine: action.payload.routine,
                listRoutines: state.listRoutines.map( routine => routine._id.toString() !== action.payload.routine._id.toString() 
                    ? routine
                    : action.payload.routine
                )
            }

        case 'updateRoutine':
            return {
                ...state,
                actualRoutine: null,
                listRoutines: state.listRoutines.map( routine => routine._id !== action.payload.routine._id 
                    ? routine
                    : action.payload.routine
                )
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

        /* case 'clearErrors':
            return {
                ...state,
                error: ''
            } */
    
        default:
            return state;
    }
}