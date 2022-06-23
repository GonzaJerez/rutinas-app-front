import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { useNavigation } from '@react-navigation/native';

interface Props {
    style?: StyleProp<ViewStyle>
}

export const GoBack = ({style}:Props) => {

    const {theme:{colors}} = useContext(ThemeContext)
    const {goBack} = useNavigation()

    return (
        <TouchableOpacity
            onPress={goBack}
            style={{...styles.container,...style as any}}
        >
            <Icon
                name='arrow-back-outline'
                color={colors.text}
                size={30}
                style={styles.arrow}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
    },
    arrow:{
        // marginTop:20,
        // left:-10
    }
});