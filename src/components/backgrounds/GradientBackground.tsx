import React, { useContext } from 'react'
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../../context/theme/ThemeContext';

export const GradientBackground = () => {

    const { theme } = useContext( ThemeContext )
    const {colors} = theme;

    return (
        <LinearGradient
            colors={ [ colors.primary, theme.lightPrimary, colors.background ] }
            style={ { ...StyleSheet.absoluteFillObject } }
            start={ { x: -0.5, y: 0 } }
            end={ { x: 1, y: 1.3 } }
        />
    )
}