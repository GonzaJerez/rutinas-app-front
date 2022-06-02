import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback, Dimensions, FlatList, TouchableOpacity, Alert, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ThemeContext } from '../context/theme/ThemeContext'
import { useSearch } from '../hooks/useSearch'
import { Routine, User } from '../interfaces/interfaces';
import { SearchInput } from './form/SearchInput'

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
    
    const {resultSearch} = useSearch('Users', userSearch)

    const onSendRoutine = () => {
        Alert.alert(
            'Enviar rutina a tal usuario',
            'Se enviará una copia de la rutina, usted seguirá teniendo la original en su cuenta',
            [
                {
                    text:'Cancelar',
                    onPress:()=>console.log('cancelado'),
                },
                {
                    text:'Enviar',
                    onPress:()=>{
                        console.log('enviando...')
                        setIsModalOpen(false)
                    }
                }
            ],
            {
                cancelable:true,
            }
        )
    }

    return (
        <Modal
            animationType='slide'
            transparent
            visible={isModalOpen}
        >
            <View style={styles.modalBackground}>
                <TouchableWithoutFeedback 
                    style={{flex:1, borderWidth:1}}
                    onPress={()=>setIsModalOpen(false)}
                >
                    <View style={{width:WIDTHSCREEN, flex:1}}/>
                </TouchableWithoutFeedback>

                <View style={{...styles.modalContainer, backgroundColor:colors.background}}>
                    <Text style={styles.modalTitle}>Enviar "{routine.name}"</Text>
                    <SearchInput onChange={setUserSearch}/>
                    <View style={styles.listFoundUsers}>
                        <FlatList 
                            data={resultSearch as User[]}
                            // data={[1,2,3]}
                            renderItem={({item})=>(

                                <TouchableOpacity 
                                    style={styles.foundUser}
                                    onPress={onSendRoutine}
                                >
                                    <View style={styles.dataUser}>
                                        <View style={{...styles.imgUser, borderColor:theme.disabledColor}}>
                                        <Image 
                                            source={(item?.img) ? {uri:item.img} : require('../assets/user-not-img.png')}
                                            style={{...styles.image, borderColor:colors.primary}}
                                        />
                                        </View>
                                        <View>
                                            <Text style={styles.nameUser}>{item.name}</Text>
                                            <Text>{item.email}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Icon 
                                            name='chevron-forward-outline'
                                            size={30}
                                        />
                                    </View>
                                    
                                </TouchableOpacity>
                            )}
                        />
                    </View>
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
        height:400,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        alignItems:'center',
        paddingTop:30
    },
    modalTitle:{
        fontSize:20,
        marginBottom:20
    },
    listFoundUsers:{
        width:'100%',
        marginTop:20,
        flex:1
    },
    foundUser:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:70,
        paddingHorizontal:15
    },
    dataUser:{
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
        flex:1
    },
    imgUser:{
        borderWidth:1,
        borderRadius:100,
        width:50,
        height:50,
        marginRight:20
    },
    image:{
        width:50,
        height:50,
        borderRadius:100,
        // borderWidth:2
    },
    nameUser:{
        fontSize:18,
        fontWeight:'500'
    }
});