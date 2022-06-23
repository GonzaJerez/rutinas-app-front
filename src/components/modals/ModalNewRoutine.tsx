import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from 'react-native'

import { ThemeContext } from '../../context/theme/ThemeContext'
import { Routine} from '../../interfaces/interfaces'
import { useSearchUsersOrGroups } from '../../hooks/useSearchUsersOrGroups'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import { RoutinesContext } from '../../context/routines/RoutinesContext'
import { NativeStackNavigation } from '../../router/NativeStackNavigation';
import { RootRoutinesNavigator } from '../../router/RoutinesNavigator'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const WIDTHSCREEN = Dimensions.get('window').width

interface Props {
    setIsOpenModalNewRoutine: React.Dispatch<React.SetStateAction<boolean>>
    isOpenModalNewRoutine:    boolean;
}

export const ModalNewRoutine = ({isOpenModalNewRoutine,setIsOpenModalNewRoutine}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;
    const {clearActualRoutine} = useContext(RoutinesContext)
    const {navigate} = useNavigation<NativeStackNavigationProp<RootRoutinesNavigator,'HomeScreen'>>()

    const onNewCustomRoutine = ()=>{
        clearActualRoutine()
        setIsOpenModalNewRoutine(false)
        navigate('FormRoutineScreen' as any)
    }

    const onViewDefaultRoutines = ()=>{
        clearActualRoutine()
        setIsOpenModalNewRoutine(false)
        navigate('DefaultRoutines')
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={isOpenModalNewRoutine}
        >
            <View style={{...styles.modalBackground, backgroundColor:theme.backgroundModal}}>
                <TouchableWithoutFeedback 
                    style={{flex:1}}
                    onPress={()=>setIsOpenModalNewRoutine(false)}
                >
                    <View style={{width:WIDTHSCREEN, flex:1}}/>
                </TouchableWithoutFeedback>

                <View style={{...styles.modalContainer, backgroundColor:colors.background}}>
                    <Text style={{...styles.modalTitle, color:colors.primary}}>Nueva rutina</Text>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity 
                            onPress={onViewDefaultRoutines}
                            style={styles.buttons}
                        >
                            <Text style={{...styles.textButtons, color:colors.text}}>Rutinas predeterminadas</Text>
                        </TouchableOpacity>

                        <View style={{...styles.separator, borderColor:theme.dividerColor}}/>

                        <TouchableOpacity 
                            onPress={onNewCustomRoutine}
                            style={styles.buttons}
                        >
                            <Text style={{...styles.textButtons, color:colors.text}}>Crear rutina personalizada</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
        zIndex:99999
    },
    modalContainer:{
        width:'100%',
        height:200,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        alignItems:'center',
        paddingTop:30
    },
    modalTitle:{
        fontSize:20,
        marginBottom:10,
        fontWeight:'500'
    },
    buttonsContainer:{
        width:'90%',
    },
    buttons:{
        height:60,
        paddingHorizontal:10,
        justifyContent:'center'
    },
    textButtons:{
        fontSize:18
    },
    separator: {
        borderBottomWidth:1,
        // width:'80%',
        // alignSelf:'center'
    }
});