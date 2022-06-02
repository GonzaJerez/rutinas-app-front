import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    onChange:   React.Dispatch<React.SetStateAction<string>>
}

export const SearchInput = ({onChange}:Props) => {

    const {theme} = useContext(ThemeContext)
    const [ textValue, setTextValue ] = useState( '' )

    /**
     * Debouncer para experar unos milisegundos antes de cambiar el estado del padre
     */
    useEffect( () => {
        const timer = setTimeout( () => {
            onChange( textValue )
        }, 500 )

        return () => {
            clearInterval( timer )
        }
    }, [ textValue ] )

  return (
    <View style={{...styles.searchContainer, borderColor:theme.disabledColor, backgroundColor:theme.colors.background}}>
        <TextInput 
            style={styles.searchInput}
            placeholder='Buscar'
            value={textValue}
            onChangeText={(value)=>setTextValue(value)}
        />
        <Icon 
            name='search-outline'
            size={25}
            style={styles.searchIcon}
            color={theme.grey}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    searchContainer:{
        borderWidth:1,
        width:350,
        // marginTop:30,
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    searchInput:{
        flex:1,
        paddingHorizontal:15,
        fontSize:16
    },
    searchIcon:{
        marginHorizontal:10
    },
});