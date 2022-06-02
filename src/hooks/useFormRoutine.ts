import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useContext, useEffect, useState } from "react"
import { RoutinesContext } from "../context/routines/RoutinesContext"
import { RoutineCreateState } from "../interfaces/interfaces"
import { RootPrivateNavigator } from "../router/PrivateNavigator"
import { useForm } from "./useForm"
import { useImagesRoutines } from "./useImagesRoutines"


export const useFormRoutine = (navigation: NativeStackNavigationProp<RootPrivateNavigator, "FormRoutineScreen">) => {
    
    const {actualRoutine, createRoutine, updateRoutine, clearActualRoutine, error, setError} = useContext(RoutinesContext)
    
    // Obtiene array con nombre de todas las imgs disponibles para la rutina
    const { imgsRoutines } = useImagesRoutines()


    // Formulario con valores por defecto cuando se crea una nueva rutina
    const { form, onChange, setFormValue } = useForm<RoutineCreateState>( {
        name: actualRoutine?.name || '',
        typeUnit: actualRoutine?.typeUnit || 'kg',
        img: actualRoutine?.img || imgsRoutines[0],
        timer: actualRoutine?.timer || 60000,
        _id: actualRoutine?._id || undefined
    } )

    /**
     * Maneja el estado local del temporizador, para despues poder convertirlo facilmente a milisegundos
     * y pasarselo al form que maneja el estado de toda la pantalla
     */
    const [timer, setTimer] = useState({
        minutes: new Date(form.timer).getMinutes(),
        seconds: new Date(form.timer).getSeconds()
    })


    // Para que cuando terminen de cargar imgsRoutines ponga en el estado la primera img por defecto y no quede undefined
    useEffect(()=>{
        onChange(imgsRoutines[0], 'img')
    },[imgsRoutines])
    

    /**
     * Cambia el estado local de los minutos y segundos
     */
    const onChangeTimer = (value:string, field:'minutes'|'seconds')=>{
        setTimer({
            ...timer,
            [field]:Number(value)
        })
    }

    /**
     * Cambia el timer en el form que maneja todo el estado de la pantalla cuando cambie el timer local
     */
    useEffect(()=>{
        onChange(((Math.round(timer.minutes * 60000 / 1000) + Math.round(timer.seconds)) * 1000).toString(), 'timer')
    },[timer])
    

    /**
     * Valida que el nombre de rutina no quede vacío y si se quiere actualizar 
     * o crear una nueva. Si hay errores en petición los agrega al context sino navega a siguiente pantalla
     */
    const onSubmit = async()=>{
        if (form.name === '') {
            return setError('El nombre de la rutina no puede quedar vacío')
        }

        // Si existe una rutina actual entonces la edita si no crea una nueva
        if (actualRoutine) {
            const resp = await updateRoutine(actualRoutine._id, form)
            if (!resp) {
                onGetOut()
            } else {
                setError(resp.msg)
            }
        } 
        else {
            const resp = await createRoutine(form)  
            if(!resp){
                navigation.replace('ChooseMuscleScreen')
                setError('')
            } else {
                setError(resp.msg)
            }
        }
    }


    const onGetOut = ()=>{
        clearActualRoutine();
        navigation.goBack();
        setError('')
    }

    return {
        form,
        imgsRoutines,
        error,
        actualRoutine,
        timer,
        onChangeTimer,
        onChange,
        onSubmit,
        onGetOut
    }
}