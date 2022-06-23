import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const windowHeight = Dimensions.get( 'window' ).height

interface Props {
    bgColor: string;
}

export const Decoration = ({bgColor}:Props) => {
  return (
    <View style={ { ...styles.decoration, backgroundColor: bgColor} } />
  )
}

const styles = StyleSheet.create({
    decoration: {
        top: windowHeight - 100,
        height: 300,
        position: 'absolute',
        transform: [ { rotate: '-12deg' } ],
        width: 800,
        left:-100
    },
});