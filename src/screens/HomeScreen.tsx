import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, Text} from 'react-native'

import { FloatButton } from '../components/buttons/FloatButton'
import { GradientBackground } from '../components/backgrounds/GradientBackground';
import { RoutinesContext } from '../context/routines/RoutinesContext';
import { ListHomeRoutines } from '../components/ListHomeRoutines';
import { ModalNewRoutine } from '../components/modals/ModalNewRoutine';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootRoutinesNavigator } from '../router/RoutinesNavigator';
import { LogoApp } from '../components/LogoApp';
import { ThemeContext } from '../context/theme/ThemeContext';

interface Props extends NativeStackScreenProps<RootRoutinesNavigator,'HomeScreen'>{}

export const HomeScreen = ({navigation}:Props) => {

    const {listRoutines, getRoutines, loadMore} = useContext(RoutinesContext)
    const {theme} = useContext(ThemeContext)
    const [isOpenModalNewRoutine, setIsOpenModalNewRoutine] = useState(false)

    useEffect(()=>{
        navigation.setOptions({
            headerLeft: ()=>(
                <View style={styles.headerContainer}>
                    <LogoApp size='small'/>
                    <Text style={{...styles.headerTitle,color:theme.whiteColor}}>Routines app</Text>
                </View>
            )
        })
    },[])
    

    useEffect(()=>{
        getRoutines({isLoadMore:false});
    },[])

    return (
        <View style={styles.routines}>
            <GradientBackground />
            {(isOpenModalNewRoutine) &&  (
                <ModalNewRoutine 
                    isOpenModalNewRoutine={isOpenModalNewRoutine} 
                    setIsOpenModalNewRoutine={setIsOpenModalNewRoutine}
                />
            )}
           

            <View style={styles.listRoutines}>
                <ListHomeRoutines 
                    routines={listRoutines} 
                    loadMore={loadMore}
                />
            </View>
            
            <FloatButton onPress={()=>setIsOpenModalNewRoutine(true)} />
            
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:'row', 
        alignItems:'center'
    },
    headerTitle:{
        fontSize:21, 
        fontWeight:'500', 
        marginLeft:10
    },
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