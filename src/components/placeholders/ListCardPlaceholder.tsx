import React from 'react'
import { View, StyleSheet} from 'react-native';
import { CardPlaceholder } from './CardPlaceholder';


export const ListCardPlaceholder = () => {

    return (
        <View style={styles.container}>
            <CardPlaceholder marginTop={20}/>
            <CardPlaceholder />
            <CardPlaceholder />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:10,
        alignItems:'center'
    },
});