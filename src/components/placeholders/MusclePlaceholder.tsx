import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { ThemeContext } from '../../context/theme/ThemeContext'

export const MusclePlaceholder = () => {

    const {theme} = useContext(ThemeContext)
    const opacity = useRef(new Animated.Value(0.6)).current;

    useEffect(()=>{
        animation()
        const animationInterval = setInterval(()=>{
            animation()
        },2000)
        return ()=>{
            clearInterval(animationInterval)
        }
    },[])

    const animation = ()=>{
        Animated.timing(
            opacity, {
                toValue:0.2,
                useNativeDriver:false,
                duration:1000,
                easing: Easing.back(1)
            }
        ).start( ()=>{
            Animated.timing(
                opacity, {
                    toValue:0.6,
                    useNativeDriver:false,
                    duration:1000,
                    
                }
            ).start()
        })
    }

    const CardMusclePlaceholder = ()=>{
        return (
            <Animated.View style={{
                ...styles.cardContainer, 
                backgroundColor:theme.colors.background,
                opacity
            }}>
                <View style={{...styles.labelPlaceholder, width:240, backgroundColor:theme.disabledColor}}/>
                <View style={{...styles.labelPlaceholder, width:150, backgroundColor:theme.disabledColor}}/>
                <View style={{...styles.labelPlaceholder, width:150, backgroundColor:theme.disabledColor}}/>
                <View style={{...styles.labelPlaceholder, width:100, backgroundColor:theme.disabledColor}}/>
            </Animated.View>
        )
    }

    return (
        <View style={styles.container}>
            <CardMusclePlaceholder />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:10,
        alignItems:'center'
    },
    cardContainer: {
        height:400,
        width:300,
        borderRadius: 25,
        paddingLeft:20,
        marginTop:20,
        paddingTop:30
    },
    labelPlaceholder:{
        height:30,
        marginTop:30,
        borderRadius:10
    }
});