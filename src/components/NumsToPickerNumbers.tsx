import React, { memo, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props {
    item: number;
}

const NumsToPickerNumbers = ( { item }: Props ) => {

    const {theme:{colors}} = useContext(ThemeContext)

    return (
        <Text style={ { ...styles.numWeight, color:colors.text } }>{ item.toString().padStart( 2, '0' ) }</Text>
    )
}

const styles = StyleSheet.create( {
    numWeight: {
        fontSize: 20,
        height: 40,
        marginLeft: 15,
        marginRight: 15,
    },
} );

export default memo( NumsToPickerNumbers )