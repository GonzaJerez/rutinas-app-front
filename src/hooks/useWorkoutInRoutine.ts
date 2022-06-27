import {useContext, useEffect, useReducer, useState} from 'react';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import { workoutInRoutinesReducer } from '../context/routines/WorkoutInRoutinesReducer';
import { RoutinesContext } from '../context/routines/RoutinesContext';
import { Workout, Set, CombinedWorkout, modeTraining } from '../interfaces/interfaces';


export const useWorkoutInRoutine = (workout:Workout, combinedWorkouts:CombinedWorkout, idDay:string)=>{

    const initialState:CombinedWorkout = {
        combinedWorkouts: [{
            _id: uuid.v4().toString(),
            tool: workout.validTools[0],
            workout,
            mode: modeTraining[0],
            sets: [{
                _id: uuid.v4().toString(),
                numReps: '',
                weight: '',
                isDescending: false
            }]
        }],
        // _id: uuid.v4().toString()
    }

    const [state, dispatch] = useReducer(workoutInRoutinesReducer, combinedWorkouts || initialState)
    const [error, setError] = useState('')
    const {goBack} = useNavigation<any>()

    const {
        createCombinedWorkouts, 
        updateCombinedWorkouts, 
        // deleteCombinedWorkouts,
        clearActualCombinedWorkouts
    } = useContext(RoutinesContext)


    /* // Siempre que renderice este screen se va a reiniciar el "actualCombinedWorkouts"
    useEffect(()=>{
        clearActualCombinedWorkouts()
    },[]) */

    /**
     * combiendWorkouts es el ejercicio combinado actual en DB, si no existe quiere decir que no existe este ejercicio
     * en DB asi que no hay nada que cargar.
     * Si sí existe en DB entonces carga la info de ese ejercicio en el state
     */
     useEffect(()=>{
        if(!combinedWorkouts) return;

        setCombinedWorkouts()
    },[combinedWorkouts])
    

    const setCombinedWorkouts = () =>{
        dispatch({type:'setCombinedWorkouts', payload:{combinedWorkout:combinedWorkouts}})
    }


    /* const addWorkout = (otherWorkout:Workout)=>{
        dispatch({type:'addWorkout', payload:{workout:otherWorkout}})
    } */

    const changeWorkout = (value:string, field:'tool' | 'mode', idWorkout:string)=>{
        dispatch({type:'changeWorkout', payload:{value, field, idWorkout}})
    }

    const deleteWorkout = (idWorkout:string)=>{
        dispatch({type:'deleteWorkout', payload:{idWorkout}})
        if (state.combinedWorkouts.length === 0) {
            goBack()
        }
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

    /**
     * Si existe "combinedWorkouts" significa que viene de la DB, por lo tanto al presionar en guardar se actualiza
     * Si no tiene id es poque se está creando uno nuevo entonces al presionar guardar lo crea en DB
     */
     const onSaveWorkout = async ()=>{
        //  Valida que no haya repeticiones vacías
        const isAnyRepEmpty = state.combinedWorkouts.find( work => (
            work.sets.find( set => set.numReps === '' && set)
        ))
        if (isAnyRepEmpty) {
            return setError('Las cantidades de repeticiones no pueden quedar vacías')
        }

        // Valida que todos los ejercicios tengan la misma cantidad de series
        const cantSetsForWorkout = state.combinedWorkouts.map( work => work.sets.length)
        const isAllSameCantSets = cantSetsForWorkout.every(cant => cant === cantSetsForWorkout[0])
        if (!isAllSameCantSets) {
            return setError('Todos los ejercicios que estén combinados deben tener la misma cantidad de series')
        }
        
        if (!state._id) {
            await createCombinedWorkouts(idDay,state)
            
        } else {
            await updateCombinedWorkouts(idDay, combinedWorkouts._id || '', state)
        }

        clearActualCombinedWorkouts()
        goBack();
    }

    return {
        state,
        error,
        changeWorkout,
        deleteWorkout,
        addSet,
        changeSet,
        deleteSet,
        onSaveWorkout
    }
}