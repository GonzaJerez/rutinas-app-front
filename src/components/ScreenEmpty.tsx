import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/theme/ThemeContext';


interface Props {
    text: string;
}

export const ScreenEmpty = ( { text }: Props ) => {

    const {theme} = useContext(ThemeContext)

    return (
        <View style={styles.textContainer}>
            <Text style={{...styles.textEmpty, color:theme.disabledColor}}>{ text }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer:{
        flex:1,
        marginTop:50,
        justifyContent:'center',
        alignItems:'center'
    },
    textEmpty:{
        fontSize:16
    }
});