import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '../../context/theme/ThemeContext';
import { RoutinesContext } from '../../context/routines/RoutinesContext';
import { Routine } from '../../interfaces/interfaces';
import { ModalSendRoutine } from '../ModalSendRoutine';

interface Props {
    routine: Routine;
    moveTopAnimation: () => void
}


export const LeftSwipe = ({routine, moveTopAnimation}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;
    const {setActualRoutine, createCopyRoutine, clearActualRoutine} = useContext(RoutinesContext)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {navigate} = useNavigation<any>()

    const toEditRoutine = ()=>{
        // clearActualRoutine()
        // setEditing('')
        setActualRoutine(routine)
        navigate('FormRoutineScreen')
    }

    const toCreateCopyRoutine = ()=>{
        createCopyRoutine(routine._id);
        moveTopAnimation();
    }

    return (
        <View style={ {...styles.container} }>
            <TouchableOpacity
                style={{...styles.buttons, ...styles.firstButton, backgroundColor:theme.light}}
                onPress={toEditRoutine}
            >
                <Icon name='color-wand-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Editar</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={{...styles.buttons, backgroundColor:theme.lightPrimary}}
                onPress={toCreateCopyRoutine}
            >
                <Icon name='copy-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Crear copia</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{...styles.buttons, ...styles.lastButton, backgroundColor:colors.primary}}
                onPress={()=>setIsModalOpen(true)}
            >
                <Icon name='share-outline' size={30} color={colors.text}/>
                <Text style={{...styles.buttonsText, color:colors.text}}>Enviar</Text>
            </TouchableOpacity>

            <ModalSendRoutine 
                routine={routine}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
            
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        width: 220,
        flexDirection:'row',
        height:180,
        opacity: 0.85,
        marginLeft:20
    },
    buttons: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width:80,
    },
    firstButton:{
        borderTopLeftRadius:25, 
        borderBottomLeftRadius: 25
    },
    lastButton:{
        width:110, 
        paddingRight:30
    },
    buttonsText: {
        fontSize: 16,
    },
} );