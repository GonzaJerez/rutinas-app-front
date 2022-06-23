import React, { useContext } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../../context/theme/ThemeContext'

interface Props {
    isOpenModalInfo:    boolean;
    setIsOpenModalInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InfoModeTraining = ({isOpenModalInfo,setIsOpenModalInfo}:Props) => {

    const {theme} = useContext(ThemeContext)

    return (
        <Modal
        animationType='fade'
        transparent
        visible={isOpenModalInfo}
        >
            <View style={{...styles.modalBackground, backgroundColor:theme.backgroundModal }}>
                <TouchableWithoutFeedback
                    style={{flex:1}}
                    onPress={()=>setIsOpenModalInfo(false)}
                >
                    <View style={{flex:1, width:'100%'}} />
                </TouchableWithoutFeedback>

                <View style={{...styles.modalContainer, backgroundColor:theme.colors.background}}>
                    <View style={{...styles.titleContainer, borderColor:theme.dividerColor}}>
                        <Text style={{...styles.title, color:theme.colors.text}}>Modo de entrenamiento</Text>
                    </View>

                    <View style={styles.bodyContainer}>
                        <Text style={{color:theme.lightText}}>
                            El modo de entrenamiento se refiere al uso de las extremiadades durante el mismo.
                            Es decir, hay ejercicios que se pueden realizar unicamente con las 2 extremidades (ya 
                            sea brazos o piernas) a la par, como es el caso de las barras, o de manera separada,
                            como por ejemplo con las mancuernas.
                        </Text>

                        <Text style={{color:theme.lightText, marginTop:5}}>
                            Para resumir: 
                        </Text>

                        <View style={styles.itemList}>
                            <Icon 
                                name='ellipse'
                                size={10}
                                color={theme.colors.text}
                            />
                            <Text style={{...styles.titleItem, color:theme.colors.text}}>Simultaneo:</Text>
                        </View>

                        <Text style={{...styles.descriptionItem, color:theme.lightText}}>
                            Con las extremidades a la par, las 2 al mismo tiempo.
                        </Text>
                        <View style={styles.itemList}>
                            <Icon 
                                name='ellipse'
                                size={10}
                                color={theme.colors.text}
                            />
                            <Text style={{...styles.titleItem, color:theme.colors.text}}>Intercalado:</Text>
                        </View>

                        <Text style={{...styles.descriptionItem, color:theme.lightText}}>
                            Se hace una repetición con una extremidad y luego con la otra, hasta terminar la
                            cantidad de repeticiones con cada una.
                        </Text>
                        <View style={styles.itemList}>
                            <Icon 
                                name='ellipse'
                                size={10}
                                color={theme.colors.text}
                            />
                            <Text style={{...styles.titleItem, color:theme.colors.text}}>Una a la vez:</Text>
                        </View>

                        <Text style={{...styles.descriptionItem, color:theme.lightText}}>
                            Primero se realizan todas las repeticiones de la serie con una extremidad y 
                            cuando se termina se realiza con la otra.
                        </Text>
                        <View style={styles.itemList}>
                            <Icon 
                                name='ellipse'
                                size={12}
                                color={theme.colors.text}
                            />
                            <Text style={{...styles.titleItem, color:theme.colors.text}}>Manteniendo el opusto:</Text>
                        </View>

                        <Text style={{...styles.descriptionItem, color:theme.lightText}}>
                            Como en "Una a la vez" pero en vez de dejar descansar la extremidad que no se está usando
                            se contrae, es decir se mantiene en una posición fija levantada aguantando el peso.
                        </Text>
                    </View>

                </View>
                    <TouchableOpacity 
                        style={{...styles.closeIcon, backgroundColor:theme.grey}}
                        onPress={()=>setIsOpenModalInfo(false)}
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
        paddingVertical:15,
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
        bottom:50,
        borderRadius:100,
        padding:12
    },
} )