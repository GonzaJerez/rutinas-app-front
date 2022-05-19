import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/auth/AuthContext';
import { RoutinesContext } from '../context/routines/RoutinesContext';
import { Workout, WorkoutInRoutine, Set } from '../interfaces/interfaces';


export const useWorkoutInRoutine = (workout:Workout, workoutInRoutine:WorkoutInRoutine)=>{

    const {actualRoutine} = useContext(RoutinesContext)
    /**
     * Crea el set por defecto vacío cuando ingresa por primera vez
     */
    const [ sets, setSets ] = useState<Set[]>( [ {
        _id: uuid.v4().toString(),
        numReps: '',
        weight: ''
    } ] )

    /**
     * Estado completo del workoutInRoutine
     */
    const { form, onChange, setFormValue } = useForm<WorkoutInRoutine>( {
        // _id: uuid.v4().toString(),
        tool: 'Dumbell',
        workout: workout,
        sets
    } )

    /**
     * Función para controlar el cambio en los sets, actualiza estado de form y sets
     */
    const onChangeSet = ( value:string, id: string, field: string ) => {
        const newSets = sets.map( set => set._id === id ? { ...set, [ field ]: value } : set )
        setSets( newSets )
        setFormValue({...form, sets: newSets})
    }

    /**
     * Crear nuevo set con id provisional
     */
    const addSet = () => {
        setSets( [ ...sets, {
            _id: uuid.v4().toString(),
            numReps: '',
            weight: ''
        } ] )
    }

    /**
     * Cuando exista workoutInRoutine (o sea cuando se esté actualizando el ejercicio) 
     * carga lo que ya tenga almacenado en DB
     */
    useEffect(()=>{
        if (!workoutInRoutine?.sets) return;

        // Primero carga los sets
        setSets(workoutInRoutine.sets.map( set => ({
            _id: uuid.v4().toString(),
            numReps: set.numReps.toString(), 
            weight: set.weight?.toString() || ''
        })))

        // Segundo carga esos sets en el estado completo del workout
        setFormValue({
            ...form,
            tool: workoutInRoutine.tool,
            workout: workoutInRoutine.workout,
            sets
        })
    },[workoutInRoutine, actualRoutine])

    return {
        form,
        sets,
        onChange,
        onChangeSet,
        addSet
    }
}