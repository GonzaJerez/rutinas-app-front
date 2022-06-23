import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props {
    size: 'small' | 'medium' | 'big',
    children: string
}

export const TextError = ({size, children}:Props) => {

    const { theme } = useContext( ThemeContext )

    return (
        <Text
            style={ {color:theme.errors, ...styles[size]} }
        >
            {children}
        </Text>
    )
}

const styles = StyleSheet.create( {
    small: {
        fontSize: 12,
    },
    medium: {
        fontSize: 16,
    },
    big: {
        fontSize: 30,
    },
} );