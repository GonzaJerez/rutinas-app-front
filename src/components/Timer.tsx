import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ThemeContext } from '../context/theme/ThemeContext'
import { useTimer } from '../hooks/useTimer';

interface Props {
    shadow:             boolean;
    setIsTimerFinished: React.Dispatch<React.SetStateAction<boolean>>
}

export const Timer = ({shadow, setIsTimerFinished}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    const {
        miliseconds,
        seconds,
        minutes,
        isPaused,
        onPause,
        onPlay,
        onRestart
    } = useTimer(setIsTimerFinished)


  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={{...styles.numbersTimer, color:colors.text}}>{minutes.toString().padStart(2,'0')}</Text>
        <Text style={{...styles.numbersTimer, color:colors.text}}>:</Text>
        <Text style={{...styles.numbersTimer, color:colors.text}}>{seconds.toString().padStart(2,'0')}</Text>
        <Text style={{...styles.numbersTimer, color:colors.text}}>:</Text>
        <Text style={{...styles.numbersTimer, color:colors.text}}>{miliseconds.toString().padStart(2,'0')}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={{...styles.buttons, backgroundColor:theme.lightPrimary, elevation:(shadow) ? 7 : 0}}
            onPress={(!isPaused) ? onPause : onPlay}
        >
            <Text style={{color:colors.background}}>{(!isPaused) ? 'Pausa' : 'Iniciar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{...styles.buttons, backgroundColor:colors.background, elevation:(shadow) ? 7 : 0}}
            onPress={onRestart}
        >
            <Text style={{color:colors.primary}}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    timerContainer:{
        flexDirection: 'row'
    },
    numbersTimer:{
        fontSize:70,
        marginHorizontal:3
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        // borderWidth:1,
        width:400,
        marginTop:40
    },
    buttons:{
        height:90,
        width:90,
        // borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
    }
});