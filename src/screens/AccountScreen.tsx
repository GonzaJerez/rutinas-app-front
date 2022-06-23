import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Image, Alert, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Title } from '../components/headers/Title'
import { ThemeContext } from '../context/theme/ThemeContext'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootAccountNavigator } from '../router/AccountNavigator'
import { AuthContext } from '../context/auth/AuthContext'
import { NameApp } from '../components/headers/NameApp'

interface Props extends NativeStackScreenProps<RootAccountNavigator,'AccountScreen'>{}

export const AccountScreen = ({navigation}:Props) => {

    const {theme, setDarkTheme,setLightTheme} = useContext(ThemeContext)
    const {colors} = theme;
    const {user, logout} = useContext(AuthContext)

    const [isDarkTheme, setIsDarkTheme] = useState((theme.currentTheme === 'dark'))

    const onChangeSwitch = ()=>{
        if (isDarkTheme) {
            setIsDarkTheme(false)
            setLightTheme()
        } else {
            setIsDarkTheme(true)
            setDarkTheme()
        }
    }

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
            <View style={styles.themeContainer}>
                <Icon 
                    name='sunny'
                    size={25}
                    color={(!isDarkTheme) ? colors.primary : theme.disabledColor}
                />
                <Switch 
                    onValueChange={onChangeSwitch}
                    value={isDarkTheme}
                    trackColor={{false: theme.dividerColor, true: theme.lightPrimary}}
                    thumbColor={colors.primary}
                    
                    style={styles.switch}
                />
                <Icon 
                    name='moon'
                    size={22}
                    color={(isDarkTheme) ? colors.primary : theme.disabledColor}
                />
            </View>
            <View style={styles.dataUserContainer}>
                <View style={{...styles.imageContainer, borderColor:colors.primary}}>
                    <Image 
                        source={(user?.img) ? {uri:user.img} : require('../assets/user-not-img.png')}
                        style={{...styles.image, borderColor:colors.primary}}
                    />
                </View>

                <View style={styles.nameContainer}>
                    <Text style={{...styles.nameUser, color: colors.text}}>{user?.name}</Text>
                    <Text style={{...styles.emailUser, color: theme.lightText}}>{user?.email}</Text>
                </View>
            </View>

            <View style={styles.configContainer}>
                <TouchableOpacity 
                    style={{...styles.rowContainer, borderColor: theme.dividerColor}}
                    onPress={()=>navigation.navigate('EditProfileScreen')}
                    disabled={(user?.google)}
                >
                    <Text style={{...styles.textConfig, color: (user?.google) ? theme.disabledColor : colors.text }}>Editar perfil</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={18}
                        color={(user?.google) ? theme.disabledColor : colors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{...styles.rowContainer, borderColor: theme.dividerColor}}
                    onPress={()=>navigation.navigate('EditEmailScreen')}
                    disabled={(user?.google)}
                >
                    <Text style={{...styles.textConfig, color: (user?.google) ? theme.disabledColor : colors.text}}>Cambiar email</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={18}
                        color={(user?.google) ? theme.disabledColor : colors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{...styles.rowContainer, borderColor: theme.dividerColor}}
                    onPress={()=>navigation.navigate('EditPasswordScreen')}
                    disabled={(user?.google)}
                >
                    <Text style={{...styles.textConfig, color: (user?.google) ? theme.disabledColor : colors.text}}>Cambiar contraseña</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={18}
                        color={(user?.google) ? theme.disabledColor : colors.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{...styles.rowContainer, borderColor: theme.dividerColor}}
                    onPress={logoutModal}
                >
                    <Text style={{...styles.textConfig, color:colors.text}}>Cerrar sesión</Text>
                    <Icon 
                        name='chevron-forward-outline'
                        size={18}
                        color={colors.text}
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
    themeContainer:{
        flexDirection:'row',
        marginTop:20,
        marginRight:20,
        alignSelf:'flex-end',
        alignItems:'center',
        width:110,
        justifyContent:'space-between'
    },
    switch:{
        transform:[{scaleX:1.2}, {scaleY: 1.2}]
    },
    title:{ 
        marginTop:20,
        marginLeft:20
    },
    dataUserContainer:{
        marginTop:60,
        alignItems:'center'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 5,
    },
    image:{
        width:200,
        height:200,
        borderRadius:100,
        // borderWidth:2
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
        // borderBottomColor:'#aaa',
        marginVertical:10,
        paddingBottom:10,
        alignItems:'center'
    },
    textConfig:{
        fontSize:16,
        // marginBottom:10
    }
} );