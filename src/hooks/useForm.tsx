import { useState } from 'react';
import { Asset } from 'react-native-image-picker';
import { Set } from '../interfaces/interfaces';

export const useForm = <T extends Object>( initState: T ) => {

    const [ state, setState ] = useState( initState );

    const onChange = ( value: string | Set[] | Asset, field: keyof T ) => {
        
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