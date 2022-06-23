import React, { useContext } from 'react'
import { View, Text, StyleSheet, TextInput, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { ErrorMessage, useField } from 'formik';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { TextError } from '../TextError';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

interface Props {
    label:          string,
    placeholder?:   string,
    name:           string,
    pass?:          boolean,
    email?:         boolean;
    marginTop?:     'smallMT' | 'mediumMT' | 'longMT'
}

export const BoxInput = ({label, pass=false, marginTop='mediumMT', email=false, ...props}:Props) => {
    const [field, meta, helpers] = useField(props)
    
    const { theme } = useContext( ThemeContext )
    const { colors } = theme;

    const [isVisiblePass, setIsVisiblePass] = useState(false)
    
    return (
        <View style={ {...styles.boxInput, ...styles[marginTop]} }>
            <Text style={ { ...styles.label, color:theme.lightText } }>{label}</Text>
            <View style={{
                ...styles.inputContainer, 
                borderColor: theme.colors.primary, 
            }}>
                <TextInput 
                    style={ { 
                        ...styles.input, 
                        color: colors.text
                    } }
                    value={field.value}
                    onChangeText={ value => helpers.setValue(value)}
                    placeholder={props.placeholder}
                    placeholderTextColor={theme.placeholderColor}
                    secureTextEntry={(pass && !isVisiblePass)}
                    keyboardType={(email) ? 'email-address' : 'default'}
                    autoComplete={(email) ? 'email' : 'off'}
                />
                {(pass) && (
                    <TouchableOpacity
                        onPress={()=>setIsVisiblePass(!isVisiblePass)}
                    >
                        <Icon 
                            name={(isVisiblePass) ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={theme.lightText}  
                        />
                    </TouchableOpacity>
                )}
            </View>
            { (meta.touched && meta.error) && <TextError size='small'>{meta.error}</TextError>}
        </View>
    )
}


const styles = StyleSheet.create({
    boxInput: {
        width: 330,
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
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth: 1,
        marginBottom:10
    },
    input: {
        paddingLeft: 5,
        fontSize: 16,
        flex:1
    },
    label: {
        fontSize: 16,
        paddingLeft: 5
    },
});