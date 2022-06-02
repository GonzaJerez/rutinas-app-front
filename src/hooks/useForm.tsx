import { useState } from 'react';
import { Set } from '../interfaces/interfaces';

export const useForm = <T extends Object>( initState: T ) => {

    const [ state, setState ] = useState( initState );

    const onChange = ( value: string | Set[] | {uri:string}, field: keyof T ) => {
        
        setState( {
            ...state,
            [ field ]: value
        } );
    }

    const setFormValue = ( form: T ) => {
        setState( form )
    }

    return {
        ...state,
        form: state,
        onChange,
        setFormValue,
    }

}