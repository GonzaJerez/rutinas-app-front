import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Title } from '../components/headers/Title'
import { ThemeContext } from '../context/theme/ThemeContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootAccountNavigator } from '../router/AccountNavigator'
import { AuthContext } from '../context/auth/AuthContext'
import { NameApp } from '../components/headers/NameApp'

interface Props extends NativeStackScreenProps<RootAccountNavigator,'AccountScreen'>{}

export const AccountScreen = ({navigation}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;
    const {user, logout} = useContext(AuthContext)

    // Modal para verificar que se quiere cerrar sesión
    const logoutModal = () => {
        Alert.alert(
            'Cerrar sesión',
            '¿Seguro deseas cerrar sesión?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }, {
                    text: 'Cerrar sesión',
                    onPress: logout
                }
            ], {
            cancelable: true,
        }
        )
    }

    return (
        <View style={ styles.container }>
            {/* <NameApp size='medium' style={styles.title}/> */}
            <View style={styles.dataUserContainer}>
                <View style={{...styles.imageContainer, borderColor:colors.primary}}>
                    <Image 
                        source={(user?.img) ? {uri:user.img} : require('../assets/user-not-img.png')}
                        style={{...styles.image, borderColor:colors.primary}}
                    />
                </View>

                <View style={styles.nameContainer}>
                    <Text style={{...styles.nameUser, color: colors.text}}>{user?.name}</Text>
                    <Text style={styles.emailUser}>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.configContainer}>
                <TouchableOpacity 
                    style={styles.rowContainer}
                    onPress={()=>navigation.navigate('EditProfile')}
                    disabled={(user?.google)}
                >
                    <Text style={{...styles.textConfig, color: (user?.google) ? theme.disabledColor : colors.text }}>Editar perfil</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={20}
                        color={(user?.google) ? theme.disabledColor : colors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.rowContainer}
                    onPress={()=>navigation.navigate('EditEmail')}
                    disabled={(user?.google)}
                >
                    <Text style={{...styles.textConfig, color: (user?.google) ? theme.disabledColor : colors.text}}>Cambiar email</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={20}
                        color={(user?.google) ? theme.disabledColor : colors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.rowContainer}
                    onPress={()=>navigation.navigate('EditPassword')}
                    disabled={(user?.google)}
                >
                    <Text style={{...styles.textConfig, color: (user?.google) ? theme.disabledColor : colors.text}}>Cambiar contraseña</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={20}
                        color={(user?.google) ? theme.disabledColor : colors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.rowContainer}
                    onPress={logoutModal}
                >
                    <Text style={{...styles.textConfig, color:colors.text}}>Cerrar sesión</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems:'center',
    },
    title:{ 
        marginTop:20,
        marginLeft:20
    },
    dataUserContainer:{
        marginTop:80,
        alignItems:'center'
    },
    imageContainer: {
        // borderWidth: 1,
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:2
    },
    nameContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    nameUser:{
        fontSize:30,
        fontWeight:'600'
    },
    emailUser:{
        fontSize:18
    },
    configContainer:{
        marginTop:50,
        width:350
    },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#aaa',
        marginVertical:10,
        paddingBottom:10
    },
    textConfig:{
        fontSize:18
    }
} );