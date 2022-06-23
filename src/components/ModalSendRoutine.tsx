import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from 'react-native'

import { ThemeContext } from '../context/theme/ThemeContext'
import { Routine} from '../interfaces/interfaces'
import { useSearchUsersOrGroups } from '../hooks/useSearchUsersOrGroups'
import { SearchInput } from './form/SearchInput'
import { SearchGroups } from './SearchGroups'
import { SearchUsers } from './SearchUsers'

interface Props {
    routine: Routine;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const WIDTHSCREEN = Dimensions.get('window').width

export const ModalSendRoutine = ({routine,isModalOpen,setIsModalOpen}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    const [userSearch, setUserSearch] = useState('')
    const [activeSlide, setActiveSlide] = useState(0)
      
    const {
        searchState,
        onToggleSelect, 
        onCloseModal, 
        onConfirmSend
    } = useSearchUsersOrGroups({
        routine,
        word: userSearch,
        setIsModalOpen
    })
    

    return (
        <Modal
            animationType='slide'
            transparent
            visible={isModalOpen}
        >
            <View style={styles.modalBackground}>
                <TouchableWithoutFeedback 
                    style={{flex:1, borderWidth:1}}
                    onPress={onCloseModal}
                >
                    <View style={{width:WIDTHSCREEN, flex:1}}/>
                </TouchableWithoutFeedback>

                <View style={{...styles.modalContainer, backgroundColor:colors.background}}>
                    <Text style={{...styles.modalTitle, color:colors.text}}>Enviar "{routine.name}"</Text>
                    <SearchInput onChange={setUserSearch}/>

                    <View style={styles.headerTopTab}>
                        <TouchableOpacity
                            onPress={()=>setActiveSlide(0)}
                            style={{
                                ...styles.labelContainer,
                                borderColor: theme.colors.primary,
                                borderBottomWidth: (activeSlide === 0) ? 1 : 0
                            }}
                        >
                            <Text style={{
                                ...styles.labelHeader,
                                color: (activeSlide === 0) ? theme.colors.primary : theme.disabledColor
                                }}
                            >
                                Usuarios
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>setActiveSlide(1)}
                            style={{
                                ...styles.labelContainer,
                                borderColor: theme.colors.primary,
                                borderBottomWidth: (activeSlide === 1) ? 1 : 0
                            }}
                        >
                            <Text style={{
                                ...styles.labelHeader,
                                color: (activeSlide === 1) ? theme.colors.primary : theme.disabledColor
                                }}
                            >
                                Grupos
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.listFoundUsers}>
                        {/* Mensaje para que usuario empiece a escribir */}
                        {(userSearch === '' && searchState.selectedGroups.length === 0 && searchState.selectedUsers.length === 0) && (
                            <View style={styles.emptyList}>
                                <Text style={{color:theme.lightText}}>Empieza a escribir para buscar usuarios</Text>
                            </View>
                        )}
                        {/* Dependiendo de en que slide se encuentra es la lista de resultados que muestra */}
                        {(activeSlide === 0)
                            ? (
                                <SearchUsers 
                                    onToggleSelect={onToggleSelect}
                                    userSearch={userSearch}
                                    searchState={searchState}
                                />
                            )
                            : (
                                <SearchGroups 
                                    onToggleSelect={onToggleSelect}
                                    userSearch={userSearch}
                                    searchState={searchState}
                                />
                            )
                        }
                    </View>

                    {( searchState.selectedUsers.length > 0 && activeSlide === 0)
                        && (
                            <TouchableOpacity
                                onPress={()=>onConfirmSend(searchState.selectedUsers,'Users')}
                                style={{...styles.buttonSend, backgroundColor:theme.colors.primary}}
                            >
                                <Text style={{color:theme.whiteColor, fontSize:16}}>Enviar</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                       ( searchState.selectedGroups.length > 0 && activeSlide === 1)
                       && (
                           <TouchableOpacity
                               onPress={()=>onConfirmSend(searchState.selectedGroups,'Groups')}
                               style={{...styles.buttonSend, backgroundColor:theme.colors.primary}}
                           >
                               <Text style={{color:theme.whiteColor, fontSize:16}}>Enviar</Text>
                           </TouchableOpacity>
                       ) 
                    }
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground:{
        backgroundColor:'#11111170',
        flex:1,
        alignItems:'center',
        justifyContent:'flex-end',
    },
    modalContainer:{
        width:'100%',
        height:500,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        alignItems:'center',
        paddingTop:30
    },
    modalTitle:{
        fontSize:20,
        marginBottom:20,
        fontWeight:'500'
    },
    headerTopTab:{
        marginTop:15,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    labelContainer:{
        width:100,
        height:35,
        // backgroundColor:'red',
        alignItems:'center',
        // justifyContent:'center'
    },
    labelHeader:{
        fontSize:18
    },
    activeHeader:{
        borderBottomWidth:1
    },
    listFoundUsers:{
        width:'100%',
        marginTop:20,
        flex:1,
        // backgroundColor:'red'
    },
    buttonSend:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    emptyList:{
        alignItems:'center',
        marginTop:30
    }
});