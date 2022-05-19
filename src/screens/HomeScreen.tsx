import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList,} from 'react-native'

import { FloatButton } from '../components/FloatButton'
import { useNavigation } from '@react-navigation/native';
import { CardRoutine } from '../components/CardRoutine'
import { Title } from '../components/Title'
import { GradientBackground } from '../components/GradientBackground';
import { RoutinesContext } from '../context/routines/RoutinesContext';


export const HomeScreen = () => {

    const {navigate} = useNavigation<any>()
    const {listRoutines, getRoutines, loadMore, clearActualRoutine} = useContext(RoutinesContext)

    const [editing, setEditing] = useState('')

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
                <FlatList
                    ListHeaderComponent={()=>(
                        <Title text='Mis rutinas'/>
                    )}
                    data={listRoutines}
                    renderItem={({item})=>(
                        <CardRoutine 
                            routine={item}
                            setEditing={setEditing}
                            isEditing={editing}
                        />
                    )}
                    keyExtractor={(item)=> item._id}
                    onEndReached={loadMore}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            
            <FloatButton onPress={onNewRoutine} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    routines:{
        flex: 1,
        // backgroundColor: 'transparent',
        paddingHorizontal: 20,
        // paddingTop: 30,
    },
    listRoutines:{
        marginTop: 30,
        // alignItems: 'center',
        // backgroundColor:'red'
    }
});