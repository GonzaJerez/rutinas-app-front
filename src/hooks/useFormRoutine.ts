import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useContext, useEffect } from "react"
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
        name: '',
        typeUnit: 'kg',
        img: imgsRoutines[0]
    } )


    // Para que cuando terminen de cargar imgsRoutines ponga en el estado la primera img por defecto y no quede undefined
    useEffect(()=>{
        onChange(imgsRoutines[0], 'img')
    },[imgsRoutines])


    // Cuando carga la rutina actual actualiza todos los valores del form
    useEffect(()=>{
        if (!actualRoutine) return;
        setFormValue({
            name: actualRoutine.name,
            typeUnit: actualRoutine.typeUnit,
            img: actualRoutine.img || imgsRoutines[0]
        })
    }, [actualRoutine])
    

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
                clearActualRoutine();
                navigation.goBack();
                setError('')
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

    return {
        form,
        imgsRoutines,
        error,
        onChange,
        onSubmit
    }
}