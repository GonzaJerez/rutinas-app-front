import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet} from 'react-native'

import { FloatButton } from '../components/buttons/FloatButton'
import { useNavigation } from '@react-navigation/native';
import { GradientBackground } from '../components/backgrounds/GradientBackground';
import { RoutinesContext } from '../context/routines/RoutinesContext';
import { ListHomeRoutines } from '../components/ListHomeRoutines';


export const HomeScreen = () => {

    const {navigate} = useNavigation<any>()
    const {listRoutines, getRoutines, loadMore, clearActualRoutine} = useContext(RoutinesContext)
    

    // const [editing, setEditing] = useState('')

    useEffect(()=>{
        getRoutines();
    },[])

    const onNewRoutine = ()=>{
        clearActualRoutine()
        navigate('FormRoutineScreen')
    }

    return (
        <View style={styles.routines}>
            <GradientBackground />

            <View style={styles.listRoutines}>
                <ListHomeRoutines 
                    routines={listRoutines} 
                    loadMore={loadMore}
                />
            </View>
            
            <FloatButton onPress={onNewRoutine} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    routines:{
        flex: 1,
        alignItems:'center',
        // paddingTop:30
    },
    listRoutines:{
        // marginTop: 30,
        // paddingHorizontal:30
    }
});