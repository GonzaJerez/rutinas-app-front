import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Title } from './headers/Title'

export const IntroApp = () => {
  return (
    <View style={styles.container}>
        <Title text='Rutinas app'/>
        <View style={styles.author}>
            <Text>GonzaJerez &copy;</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    author:{
        position:'absolute',
        bottom: 20
    }
});