import React, { createContext, useContext, useReducer, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { RoutinesReducer, StateProps, initialState } from "./RoutinesReducer";
import { CombinedWorkout, Day, GetRoutines, Routine, RoutineCreateState, RoutineResponse, SearchInDB, WorkoutInRoutine } from '../../interfaces/interfaces';
import { CreateCopyProps, createCopyRoutineApi, createRoutineInDB, CreateRoutineProps, deleteRoutineInDB, DeleteRoutineProps, getRoutinesFromDB, GetRoutinesProps, updateRoutineInDB, UpdateRoutineProps } from "../../helpers/routines/routinesApis";
import { createDayRoutineInDB, CreateDayRoutineProps, deleteDayRoutineInDB, DeleteDayRoutineProps, updateDayRoutineInDB, UpdateDayRoutineProps } from "../../helpers/routines/dayRoutineApis";
import { createWorkoutInRoutineInDB, createWorkoutInRoutineProps, deleteWorkoutInRoutineInDB, DeleteWorkoutInRoutineProps, updateWorkoutInRoutineInDB, UpdateWorkoutInRoutineProps } from "../../helpers/routines/workoutInRoutineApis";
import { CreateCombinedWorkoutProps, createCombinedWorkoutsApi, deleteCombinedWorkoutApi, DeleteCombinedWorkoutProps, PatchWeightCombinedWorkoutProps, patchWeightCombinedWorkoutsApi, UpdateCombinedWorkoutProps, updateCombinedWorkoutsApi } from "../../helpers/routines/combinedWorkoutsApis";
import { searchInCollectionApi, SearchProps } from "../../helpers/searchApi";

interface ContextProps extends StateProps {
    getRoutines:            () => Promise<void>;
    loadMore:               () => Promise<void>;
    createRoutine:          (form: RoutineCreateState) => Promise<{msg:string} | undefined>
    updateRoutine:          (idRoutine: string, form: RoutineCreateState) => Promise<{msg: string} | undefined>
    deleteRoutine:          (idRoutine: string) => Promise<void>
    createCopyRoutine:      (idRoutine: string) => Promise<void>
    setActualRoutine:       (routine: Routine) => void
    clearActualRoutine:     () => void
    createDayRoutine:       (idRoutine: string) => Promise<void | Routine>
    updateDayRoutine:       (idDay: string, combinedWorkouts: CombinedWorkout[]) => Promise<void>
    deleteDayRoutine:       (idDay: string) => Promise<void>
    createCombinedWorkouts: (idDay: string, body: CombinedWorkout) => Promise<void>
    updateCombinedWorkouts: (idDay: string, idCombinedWorkouts: string, body: CombinedWorkout) => Promise<void>
    // patchWeightCombinedWorkouts: (idDay: string, idCombinedWorkouts: string, newWeights: number[]) => Promise<void>
    deleteCombinedWorkouts: (idDay: string, idCombinedWorkouts: string) => Promise<void>
    setActualCombinedWorkouts: (combinedWorkouts: CombinedWorkout) => void
    clearActualCombinedWorkouts: () => void
    createWorkoutInRoutine: (idDay: string, idCombinedWorkouts: string, form: WorkoutInRoutine) => Promise<void>
    updateWorkoutInRoutine: (idDay: string, idCombinedWorkouts: string, idWorkoutInRoutine: string, form: WorkoutInRoutine) => Promise<void>
    deleteWorkoutInRoutine: (idDay: string, idCombinedWorkouts: string, idWorkoutInRoutine: string) => Promise<void>
    setError:           (error: string) => void
}

export const RoutinesContext = createContext({} as ContextProps)


export const RoutinesProvider = ({children}:any)=>{

    const {token} = useContext(AuthContext)
    const [page, setPage] = useState(1)
    const limit = 100;

    const [state, dispatch] = useReducer(RoutinesReducer, initialState)
    
    
    /**
     * Carga las rutinas del usuario en pantalla principal
     */
    const getRoutines = async()=>{
        if (!token) return;

        const args:GetRoutinesProps = {
            page,limit,token
        }

        try{
            const {routines, msg}:GetRoutines = await getRoutinesFromDB(args)
            
            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

            routines.sort((a,b) => b.modifyDate - a.modifyDate)
            dispatch({type:'addRoutinesToListRoutines', payload:{routines}})
            // console.log(state.listRoutines);
            

            setPage( page + 1)
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Carga más rutinas con un lazy load
     */
    const loadMore = async()=>{
        if (state.listRoutines.length === limit * (page - 1) ) {
            await getRoutines()
        }
    }

    /**
     * Crea rutina en DB y la setea como la rutina actual
     */ 
    const createRoutine = async(form:RoutineCreateState)=>{
        if(!token) return;

        const args:CreateRoutineProps = {
            body: form,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await createRoutineInDB(args)
            
            if(msg){
                // return dispatch({type:'setError', payload:msg})
                return {msg};
            }
            // Llama a la creacion de un nuevo día y esa rutina actualizada es la que guarda en listRoutines
            const routineWithFirstDay = await createDayRoutine(routine._id)
            if(routineWithFirstDay){
                dispatch({type:'addRoutinesToListRoutines', payload:{routines:[routineWithFirstDay]}})
            }
            
        } catch (err) {
            console.log(err);
        }
    }


    /**
     * Actualiza rutina en DB y actualiza la rutina en el listado principal
     */
    const updateRoutine = async(idRoutine:string, form:RoutineCreateState) => {
        if(!token) return;

        const args:UpdateRoutineProps = {
            idRoutine,
            body: form,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await updateRoutineInDB(args)
            
            if(msg){
                return {msg}
            }

            dispatch({type: 'updateRoutine', payload:{routine}})
            // updateListRoutines(routine)
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Elimina la rutina de DB y del listado principal
     */
    const deleteRoutine = async(idRoutine:string) => {
        if(!token) return;

        const args:DeleteRoutineProps = {idRoutine,token}

        try {
            await deleteRoutineInDB(args)
            dispatch({type: 'deleteRoutine', payload:{idRoutine}})

        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Pasandole el id de una rutina crea copia de rutina
     */
    const createCopyRoutine = async(idRoutine:string)=>{
        if(!token) return;

        const args:CreateCopyProps = {
            idRoutine,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await createCopyRoutineApi(args)
            
            if(msg){
                return dispatch({type:'setError', payload:msg})
            }
            if (routine) {
                dispatch({type:'addRoutinesToListRoutines', payload:{routines:[routine]}})
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Inserta en estado global la rutina actual
     */
    const setActualRoutine = (routine:Routine)=> {
        routine.days = routine.days.map( (day,index) => ({...day, img:`../../assets/days/day${index + 1}.jpg`}))
        dispatch({type:'setActualRoutine', payload:{routine}})
    }

    /**
     * Limpia del estado global la rutina actual
     */
    const clearActualRoutine = ()=>{
        dispatch({type:'clearActualRoutine'})
    }

    /**
     * Crea nuevo día en DB y actualiza tanto el actualRoutine como el listRoutines
     */
    const createDayRoutine = async(idRoutine:string) => {
        if (!token) return;
        const args:CreateDayRoutineProps = {idRoutine,token}

        try {
            const {routine, msg}:RoutineResponse = await createDayRoutineInDB(args)
            
            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

            dispatch({type:'setActualRoutine', payload:{routine}})
            // sortListRoutines()
            return routine;
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Actualiza el orden de los workouts en día de rutina
     * 1ro actualiza el estado de la rutina actual y después recupera el día actual,
     * reemplaza lo que haya por el nuevo array de workoutsInRoutine y lo actualiza en DB
     */
    const updateDayRoutine = async(idDay:string, combinedWorkouts:CombinedWorkout[]) => {
        if (!token) return;

        // Actualiza actualRoutine
        dispatch({type:'updateActualRoutine', payload:{idDay,combinedWorkouts}})

        // Recupera el día completo y reemplaza los workouts anteriores por el nuevo array
        const body = state.actualRoutine?.days.find( day => day._id?.toString() === idDay)
        if (!body) return;
        body.workouts = combinedWorkouts;
        const args:UpdateDayRoutineProps = {
            idRoutine: state.actualRoutine?._id || '',
            idDay,
            token,
            body
        }

        // Actualiza el día de rutina en DB
        try {
            const {routine,msg}:RoutineResponse = await updateDayRoutineInDB(args)

            if (msg) {
                return dispatch({type:'setError', payload:msg})
            }

            dispatch({type:'setActualRoutine', payload:{routine}})

        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Elimina día en DB y actualiza tanto el actualRoutine como el listRoutines
     */
    const deleteDayRoutine = async(idDay:string) =>{
        if (!state.actualRoutine || !token) return;
        const args:DeleteDayRoutineProps = {
            idRoutine: state.actualRoutine._id,
            idDay,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await deleteDayRoutineInDB(args)
            
            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

            dispatch({type:'setActualRoutine', payload:{routine}})
        } catch (err) {
            console.log(err);
        }
    } 

    /**
     * Crea combinación de ejercicios en DB y actualiza tanto el actualRoutine como el listRoutines
     */
    const createCombinedWorkouts = async(idDay:string, body:CombinedWorkout)=>{
        if (!state.actualRoutine || !token) return;

        const args:CreateCombinedWorkoutProps = {
            idRoutine: state.actualRoutine?._id,
            idDay,
            body,
            token
        }
        

        try {
            const {routine, msg}:RoutineResponse = await createCombinedWorkoutsApi(args)

            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

            dispatch({type:'setActualRoutine', payload:{routine}})

        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Actualiza combinación de ejercicios en DB y actualiza tanto el actualRoutine como el listRoutines
     */
    const updateCombinedWorkouts = async(idDay:string, idCombinedWorkouts:string, body:CombinedWorkout)=>{
        if (!state.actualRoutine || !token) return;
        
        const args:UpdateCombinedWorkoutProps = {
            idRoutine: state.actualRoutine?._id,
            idDay,
            idCombinedWorkouts,
            body,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await updateCombinedWorkoutsApi(args)

            if(msg){
                console.log(msg);
                
                return dispatch({type:'setError', payload:msg})
            }
            
            dispatch({type:'setActualRoutine', payload:{routine}})

        } catch (err) {
            console.log(err);
        }
    }

    /* const patchWeightCombinedWorkouts = async(idDay:string, idCombinedWorkouts:string, newWeights:number[]) => {
        if (!state.actualRoutine || !token) return;

        const args:PatchWeightCombinedWorkoutProps = {
            idRoutine: state.actualRoutine?._id,
            idDay,
            idCombinedWorkouts,
            newWeights,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await patchWeightCombinedWorkoutsApi(args)

            if(msg){
                return dispatch({type:'setError', payload:msg})
            }
            
            dispatch({type:'setActualRoutine', payload:{routine}})

        } catch (err) {
            console.log(err);
        }
    } */

    /**
     * Elimina combinación de ejercicios en DB y actualiza tanto el actualRoutine como el listRoutines
     */
    const deleteCombinedWorkouts = async(idDay:string, idCombinedWorkouts:string)=>{
        if (!state.actualRoutine || !token) return;

        const args:DeleteCombinedWorkoutProps = {
            idRoutine: state.actualRoutine?._id,
            idDay,
            idCombinedWorkouts,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await deleteCombinedWorkoutApi(args)

            if(msg){
                return dispatch({type:'setError', payload:msg})
            }
            
            dispatch({type:'setActualRoutine', payload:{routine}})

        } catch (err) {
            console.log(err);
        }
    }

    const setActualCombinedWorkouts = (combinedWorkouts:CombinedWorkout)=>{
        dispatch({type:'setActualCombinedWorkouts', payload:{combinedWorkouts}})
    }

    const clearActualCombinedWorkouts = () => {
        dispatch({type:'clearActualCombinedWorkouts'})
    }

    /**
     * Crea nuevo ejercicio en rutina y actualiza tanto el actualRoutine como el listRoutines
     */
    const createWorkoutInRoutine = async( idDay:string, idCombinedWorkouts:string, form:WorkoutInRoutine ) => {
        if (!state.actualRoutine || !token) return;

        const args:createWorkoutInRoutineProps = {
            idRoutine: state.actualRoutine._id,
            idDay,
            idCombinedWorkouts,
            form,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await createWorkoutInRoutineInDB(args)
            
            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

            dispatch({type:'setActualRoutine', payload:{routine}})
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Actualiza ejercicio en rutina y actualiza tanto el actualRoutine como el listRoutines
     */
     const updateWorkoutInRoutine = async(idDay:string, idCombinedWorkouts:string, idWorkoutInRoutine:string, form:WorkoutInRoutine) => {
        if (!state.actualRoutine || !token) return;

        const args:UpdateWorkoutInRoutineProps = {
            idRoutine: state.actualRoutine._id,
            idDay,
            idCombinedWorkouts,
            idWorkoutInRoutine,
            form,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await updateWorkoutInRoutineInDB(args)
            
            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

            dispatch({type:'setActualRoutine', payload:{routine}})
        } catch (err) {
            console.log(err);
        }
    }
    
    /**
     * Elimina ejercicio en rutina y actualiza tanto el actualRoutine como el listRoutines
     */
    const deleteWorkoutInRoutine = async(idDay:string, idCombinedWorkouts:string, idWorkoutInRoutine:string) => {
        if (!state.actualRoutine || !token) return;

        const args:DeleteWorkoutInRoutineProps = {
            idRoutine: state.actualRoutine._id,
            idDay,
            idCombinedWorkouts,
            idWorkoutInRoutine,
            token
        }

        try {
            const {routine, msg}:RoutineResponse = await deleteWorkoutInRoutineInDB(args)
            
            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

            dispatch({type:'setActualRoutine', payload:{routine}})
        } catch (err) {
            console.log(err);
        }
    }

    const setError = (error:string) => {
        dispatch({type:'setError', payload:error})
    }

    /* const searchInCollection = async(collection: 'Users'|'Movements', word:string)=>{
        if (!state.actualRoutine || !token) return;

        const args:SearchProps = {
            collection,
            token,
            word
        }

        try {
            const {results,msg}:SearchInDB = await searchInCollectionApi(args)

            if(msg){
                return dispatch({type:'setError', payload:msg})
            }

        } catch (error) {
            
        }
    } */

    return(
        <RoutinesContext.Provider
            value={{
                ...state,
                getRoutines,
                loadMore,
                // updateListRoutines,
                createRoutine,
                updateRoutine,
                deleteRoutine,
                createCopyRoutine,
                setActualRoutine,
                clearActualRoutine,
                createDayRoutine,
                updateDayRoutine,
                deleteDayRoutine,
                createCombinedWorkouts,
                updateCombinedWorkouts,
                // patchWeightCombinedWorkouts,
                deleteCombinedWorkouts,
                setActualCombinedWorkouts,
                clearActualCombinedWorkouts,
                createWorkoutInRoutine,
                updateWorkoutInRoutine,
                deleteWorkoutInRoutine,
                setError
            }}
        >
            {children}
        </RoutinesContext.Provider>
    )
}