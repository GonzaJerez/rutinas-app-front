import React, { createContext, useContext, useReducer, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { RoutinesReducer, StateProps, initialState } from "./RoutinesReducer";
import { GetRoutines, Routine, RoutineCreateState, RoutineResponse, WorkoutInRoutine } from '../../interfaces/interfaces';
import { createRoutineInDB, CreateRoutineProps, deleteRoutineInDB, DeleteRoutineProps, getRoutinesFromDB, GetRoutinesProps, updateRoutineInDB, UpdateRoutineProps } from "../../helpers/routinesApis";
import { createDayRoutineInDB, CreateDayRoutineProps, deleteDayRoutineInDB, DeleteDayRoutineProps } from "../../helpers/dayRoutineApis";
import { createWorkoutInRoutineInDB, createWorkoutInRoutineProps, deleteWorkoutInRoutineInDB, DeleteWorkoutInRoutineProps, updateWorkoutInRoutineInDB, UpdateWorkoutInRoutineProps } from "../../helpers/workoutInRoutineApis";

interface ContextProps extends StateProps {
    getRoutines:        () => Promise<void>;
    loadMore:           () => Promise<void>;
    createRoutine:      (form: RoutineCreateState) => Promise<{msg:string} | undefined>
    updateRoutine: (idRoutine: string, form: RoutineCreateState) => Promise<{msg: string} | undefined>
    deleteRoutine:      (idRoutine: string) => Promise<void>
    setActualRoutine:   (routine: Routine) => void
    clearActualRoutine: () => void
    createDayRoutine:   (idRoutine: string) => Promise<void>
    deleteDayRoutine:   (idDay: string) => Promise<void>
    createWorkoutInRoutine: (idDay: string, form: WorkoutInRoutine) => Promise<void>
    updateWorkoutInRoutine: (idDay: string, idWorkoutInRoutine: string, form: WorkoutInRoutine) => Promise<void>
    deleteWorkoutInRoutine: (idDay: string, idWorkoutInRoutine: string) => Promise<void>
    setError:           (error: string) => void
}

export const RoutinesContext = createContext({} as ContextProps)


export const RoutinesProvider = ({children}:any)=>{

    const {token} = useContext(AuthContext)
    const [page, setPage] = useState(1)
    const limit = 10;

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

            routines.reverse()
            dispatch({type:'setListRoutines', payload:{routines}})

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
            
            await createDayRoutine(routine._id)
            
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

    const setActualRoutine = (routine:Routine)=> {
        dispatch({type:'setActualRoutine', payload:{routine}})
    }

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
            dispatch({type:'setListRoutines', payload:{routines:[routine]}})
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
     * Crea nuevo ejercicio en rutina y actualiza tanto el actualRoutine como el listRoutines
     */
    const createWorkoutInRoutine = async( idDay:string, form:WorkoutInRoutine ) => {
        if (!state.actualRoutine || !token) return;

        const args:createWorkoutInRoutineProps = {
            idRoutine: state.actualRoutine._id,
            idDay,
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
     const updateWorkoutInRoutine = async(idDay:string, idWorkoutInRoutine:string, form:WorkoutInRoutine) => {
        if (!state.actualRoutine || !token) return;

        const args:UpdateWorkoutInRoutineProps = {
            idRoutine: state.actualRoutine._id,
            idDay,
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
    const deleteWorkoutInRoutine = async(idDay:string, idWorkoutInRoutine:string) => {
        if (!state.actualRoutine || !token) return;

        const args:DeleteWorkoutInRoutineProps = {
            idRoutine: state.actualRoutine._id,
            idDay,
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

    return(
        <RoutinesContext.Provider
            value={{
                ...state,
                getRoutines,
                loadMore,
                createRoutine,
                updateRoutine,
                deleteRoutine,
                setActualRoutine,
                clearActualRoutine,
                createDayRoutine,
                deleteDayRoutine,
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