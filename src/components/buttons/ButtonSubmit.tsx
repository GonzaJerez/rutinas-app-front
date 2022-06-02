import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    text: string,
    onPress: any,
    icon?: string, 
    type?: 'primary' | 'secondary',
    style?: StyleProp<ViewStyle>
}

export const ButtonSubmit = ({text, style, type='primary', onPress, icon}:Props) => {

    const { theme:{colors} } = useContext( ThemeContext )

    return (
        <TouchableOpacity
        onPress={onPress}
        style={ { 
            ...styles.submitButton, 
            backgroundColor: (type === 'primary') ? colors.primary : colors.background,
            borderColor: colors.background,
            ...style as any 
        } }>
            <Text style={ { 
                ...styles.textButton, 
                color: (type === 'primary') ? colors.background : colors.primary } }>{text}
            </Text>
            {
                (icon)
                    && <Icon 
                        name={icon}
                        size={30}
                        color={colors.background}
                        style={styles.icon}
                    />
            }
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    submitButton: {
        alignItems: 'center',
        flexDirection:'row',
        borderRadius: 50,
        height: 55,
        justifyContent: 'center',
        width: 120,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center'
    },
    icon:{
        marginLeft:7,
        bottom:-1
    }
});