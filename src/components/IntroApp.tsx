import React, { useContext, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { ThemeContext } from '../context/theme/ThemeContext'
import { Title } from './headers/Title'

export const IntroApp = () => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    const opacityTitle = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        Animated.timing(
            opacityTitle,{
                toValue:1,
                useNativeDriver:true,
                duration:2000,
            }
        ).start()
    },[])

  return (
    <View style={{...styles.container, backgroundColor:colors.primary}}>

        <Animated.View style={{opacity:opacityTitle}}>
            <Title text='Gym Tonic' style={{color:theme.whiteColor}}/>
        </Animated.View>

        <View style={styles.author}>
            <Text style={{color:theme.whiteColor, fontWeight:'100', fontSize:12}}>GonzaJerez &copy;</Text>
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
        bottom:40
    }
});