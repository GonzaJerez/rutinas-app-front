import React, { useContext, useEffect, useRef } from 'react'
import { View, Text, Animated, StyleSheet, Dimensions, Easing } from 'react-native'
import { ThemeContext } from '../../context/theme/ThemeContext'

const WIDTHSCREEN = Dimensions.get('window').width

interface Props {
    marginTop?:         number;
}

export const CardPlaceholder = ({marginTop = 0}:Props) => {

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
    
    return (
        <Animated.View style={{
            ...styles.cardContainer, 
            backgroundColor:theme.colors.card,
            opacity,
            marginTop,
        }}>
            <View style={{...styles.labelPlaceholder, width:280, backgroundColor:theme.disabledColor}}/>
            <View style={{...styles.labelPlaceholder, width:150, backgroundColor:theme.disabledColor}}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        alignSelf:'center',
        height:180,
        width:WIDTHSCREEN - 50,
        borderRadius: 25,
        paddingLeft:20,
        // marginTop:20
        marginBottom:15,
    },
    labelPlaceholder:{
        height:30,
        marginTop:30,
        borderRadius:10
    }
});