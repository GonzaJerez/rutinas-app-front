import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/theme/ThemeContext'

interface Props {
    size?:              'small' | 'medium' | 'big';
    style?:             StyleProp<ViewStyle>
    backgroundLight?:   boolean;
}

export const LogoApp = ({size='medium', style,backgroundLight}:Props) => {

    let sizeLogo = 60;
    if (size === 'small') {
        sizeLogo = 35
    }
    if (size === 'big') {
        sizeLogo = 210
    }

    const {theme} = useContext(ThemeContext)

    return (
        <View 
            style={ {
                ...styles.container, 
                backgroundColor:(backgroundLight)
                    ? theme.whiteColor
                    : theme.colors.background,
                ...style as any,
                width:sizeLogo -5,
                height: sizeLogo -5,
            } }
        >
            <Image
                source={ require( '../assets/logo.png' ) }
                style={ {
                    ...styles.image,
                    width:sizeLogo,
                    height: sizeLogo
                } }
            />
        </View>
    )
}


const styles = StyleSheet.create( {
    container:{
        alignItems: 'center', 
        borderRadius: 100, 
        justifyContent: 'center', 
    },
    image:{
        borderRadius: 100,
        opacity:1
    }
} )