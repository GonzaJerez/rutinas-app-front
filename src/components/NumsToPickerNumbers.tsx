import React, { memo } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
    item: number;
}

const NumsToPickerNumbers = ({item}:Props) => {
  return (
    <Text style={{...styles.numWeight}}>{item.toString().padStart(2,'0')}</Text>
  )
}

const styles = StyleSheet.create({
    numWeight:{
        fontSize:22,
        height:40,
        marginLeft:15,
        marginRight:15,
    },
});

export default memo(NumsToPickerNumbers)