import React, { useContext } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    isOpenModal:    boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OfflineModal = ({isOpenModal,setIsOpenModal}:Props) => {

    const {theme} = useContext(ThemeContext)

    return (
        <Modal
        animationType='fade'
        transparent
        visible={isOpenModal}
        >
            <View style={{...styles.modalBackground, backgroundColor:theme.backgroundModal }}>
                <TouchableWithoutFeedback
                    style={{flex:1}}
                    onPress={()=>setIsOpenModal(false)}
                >
                    <View style={{flex:1, width:'100%'}} />
                </TouchableWithoutFeedback>

                <View style={{...styles.modalContainer, backgroundColor:theme.colors.background}}>
                    <View style={{...styles.titleContainer, borderColor:theme.dividerColor}}>
                        <Text style={{...styles.title, color:theme.colors.primary}}>Sin conexión</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        <Text style={{color:theme.lightText}}>Vuelve a intentarlo cuando hayas recuperado la conexión a internet</Text>
                    </View>

                </View>
                    <TouchableOpacity 
                        style={{...styles.closeIcon, backgroundColor:theme.grey}}
                        onPress={()=>setIsOpenModal(false)}
                    >
                        <Icon
                            name='close-outline'
                            size={25}
                            color={theme.colors.background}
                        />
                    </TouchableOpacity>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create( {
    modalBackground:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    modalContainer:{
        width:320,
        position:'absolute',
        borderRadius:20
    },
    titleContainer:{
        height:60,
        borderBottomWidth:1,
        alignItems:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:18
    },
    bodyContainer:{
        paddingVertical:30,
        paddingHorizontal:15,
        justifyContent:'center',
    },
    itemList:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
    },
    titleItem:{
        marginLeft: 5,
        fontWeight:'500',
    },
    descriptionItem:{
        paddingLeft:15
    },
    closeIcon:{
        position:'absolute',
        bottom:250,
        borderRadius:100,
        padding:12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 5,
    },
} )