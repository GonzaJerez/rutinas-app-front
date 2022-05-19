import React, { useContext } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { ErrorMessage, useField } from 'formik';

import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
    label: string,
    placeholder?: string,
    name: string,
}

export const BoxInput = ({label, ...props}:Props) => {

    const [field, meta, helpers] = useField(props)
    
    const { theme } = useContext( ThemeContext )
    const { colors } = theme;
    
    return (
        <View style={ styles.boxInput }>
            <Text style={ { ...styles.label, color: colors.text } }>{label}</Text>
            <TextInput 
                style={ { 
                    ...styles.input, 
                    borderColor: theme.lightPrimary, 
                    backgroundColor: colors.background 
                } }
                value={field.value}
                onChangeText={ value => helpers.setValue(value)}
            />
            { (meta.touched && meta.error) && <Text>{meta.error}</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    boxInput: {
        marginBottom: '10%'
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        marginTop: '3%',
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16
    },
});