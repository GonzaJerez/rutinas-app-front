import React, { useContext } from 'react'
import { View, Text, StyleSheet, TextInput, StyleProp, ViewStyle } from 'react-native';
import { ErrorMessage, useField } from 'formik';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { TextError } from '../TextError';

interface Props {
    label:          string,
    placeholder?:   string,
    name:           string,
    pass?:          boolean,
    marginTop?:     'smallMT' | 'mediumMT' | 'longMT'
}

export const BoxInput = ({label, pass=false, marginTop='mediumMT', ...props}:Props) => {

    const [field, meta, helpers] = useField(props)
    
    const { theme } = useContext( ThemeContext )
    const { colors } = theme;
    
    return (
        <View style={ {...styles.boxInput, ...styles[marginTop]} }>
            <Text style={ { ...styles.label } }>{label}</Text>
            <TextInput 
                style={ { 
                    ...styles.input, 
                    borderColor: theme.lightPrimary, 
                    backgroundColor: colors.background 
                } }
                value={field.value}
                onChangeText={ value => helpers.setValue(value)}
                placeholder={props.placeholder}
                secureTextEntry={(pass) && true}
            />
            { (meta.touched && meta.error) && <TextError size='small'>{meta.error}</TextError>}
        </View>
    )
}


const styles = StyleSheet.create({
    boxInput: {
        // marginBottom: '10%'
        // marginTop: 50,
        width: 350
    },
    smallMT: {
        marginTop:10
    },
    mediumMT: {
        marginTop:30
    },
    longMT: {
        marginTop:50
    },
    input: {
        borderBottomWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        fontSize: 18
    },
    label: {
        fontSize: 16,
        paddingLeft: 5
    },
});