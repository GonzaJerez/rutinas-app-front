import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../context/theme/ThemeContext';

export const GradientBackground = () => {

    const { theme: { colors } } = useContext( ThemeContext )

    return (
        <LinearGradient
            colors={ [ colors.primary, colors.background ] }
            style={ { ...StyleSheet.absoluteFillObject } }
            start={ { x: 0, y: 0 } }
            end={ { x: 0.9, y: 0.6 } }
        />
    )
}
