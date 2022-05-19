import React from 'react'
import { View,StyleSheet } from 'react-native'
import { GoBack } from './GoBack';
import { Title } from './Title';

interface Props {
    text: string;
}

export const HeaderTitleBack = ({text}:Props) => {
  return (
    <View style={styles.header}>
        <GoBack />
        <Title text={text} style={styles.title}/>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:20,
        marginLeft: 20
    },
    title: {
        paddingLeft: 10,
    },
});