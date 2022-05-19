import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../context/theme/ThemeContext'
import { useNavigation } from '@react-navigation/native';

export const GoBack = () => {

    const {theme:{colors}} = useContext(ThemeContext)
    const {goBack} = useNavigation()

    return (
        <TouchableOpacity
            onPress={goBack}
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
    arrow:{
        // marginTop:20,
        left:-10
    }
});