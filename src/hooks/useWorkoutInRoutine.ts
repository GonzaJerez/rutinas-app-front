import {useReducer} from 'react';
import uuid from 'react-native-uuid';

import { Workout, WorkoutInRoutine, Set, CombinedWorkout } from '../interfaces/interfaces';
import { workoutInRoutinesReducer } from '../context/routines/WorkoutInRoutinesReducer';


export const useWorkoutInRoutine = (workout:Workout)=>{

    const initialState:CombinedWorkout = {
        combinedWorkouts: [{
            _id: uuid.v4().toString(),
            tool: 'Mancuerna',
            workout,
            sets: [{
                _id: uuid.v4().toString(),
                numReps: '',
                weight: ''
            }]
        }],
        // _id: uuid.v4().toString()
    }

    const [state, dispatch] = useReducer(workoutInRoutinesReducer, initialState)
    

    const setCombinedWorkouts = (combinedWorkouts:CombinedWorkout) =>{
        dispatch({type:'setCombinedWorkouts', payload:{combinedWorkouts}})
    }


    /* const addWorkout = (otherWorkout:Workout)=>{
        dispatch({type:'addWorkout', payload:{workout:otherWorkout}})
    } */

    const changeWorkout = (tool:string, idWorkout:string)=>{
        dispatch({type:'changeWorkout', payload:{tool, idWorkout}})
    }

    const deleteWorkout = (idWorkout:string)=>{
        dispatch({type:'deleteWorkout', payload:{idWorkout}})
    }

    const addSet = (idWorkout:string)=>{
        dispatch({type:'addSet', payload:{idWorkout}})
    }

    const changeSet = (idWorkout:string, idSet:string, form:Set) => {
        dispatch({type:'changeSet', payload:{idWorkout,idSet,form}})
    }

    const deleteSet = (idWorkout:string, idSet:string) => {
        dispatch({type:'deleteSet', payload:{idWorkout, idSet}})
    }

    return {
        state,
        setCombinedWorkouts,
        // addWorkout,
        changeWorkout,
        deleteWorkout,
        addSet,
        changeSet,
        deleteSet,
    }
}