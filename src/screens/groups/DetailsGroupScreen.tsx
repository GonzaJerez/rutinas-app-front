import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootSocialNavigator } from '../../router/SocialNavigator';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { AuthContext } from '../../context/auth/AuthContext';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { useDeleteUsersOrGroup } from '../../hooks/useDeleteUsersOrGroup';


interface Props extends NativeStackScreenProps<RootSocialNavigator,'DetailsGroupScreen'>{}

export const DetailsGroupScreen = ({navigation}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {user} = useContext(AuthContext)

    const {
        actualGroup,
        isDeletingUsers,
        usersSelected,
        onToggleSelected,
        onDeleteGroup,
        onDeleteUsers,
        setIsDeletingUsers,
        onCancelDelete
    } = useDeleteUsersOrGroup()

    /**
     * Actualiza el nombre del header
     */
    useEffect(()=>{
        navigation.setOptions({
            title: actualGroup?.name
        })
    },[actualGroup])


    return (
        <ScrollView>
            <View style={styles.dataUserContainer}>
                {(actualGroup?.admin._id === user?._id) && (
                    <TouchableOpacity
                        onPress={()=>navigation.navigate('EditGroupScreen')}
                        style={{alignSelf:'flex-end'}}
                    >
                        <Text style={{color:theme.colors.primary, fontSize:16}}>Editar grupo</Text>
                    </TouchableOpacity>
                )}
                <View style={{...styles.imageContainer}}>
                    <Image 
                        source={(actualGroup?.img) ? {uri:actualGroup.img} : require('../../assets/user-not-img.png')}
                        style={{...styles.imageGroup}}
                    />
                </View>

                <View style={styles.nameContainer}>
                    <Text style={{...styles.nameGroup, color:theme.colors.text}}>{actualGroup?.name}</Text>
                </View>
                
                <View>
                    <Text style={{color:theme.disabledColor}}>{actualGroup?.description}</Text>
                </View>

                <View style={styles.headerList}>
                    <Text style={{...styles.headerListText, color:theme.colors.text}}>Usuarios</Text>
                </View>

                <View style={styles.listUsersContainer}>
                    {(actualGroup?.users.map( us => (
                        <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={()=> onToggleSelected(us._id)}
                            disabled={!isDeletingUsers || actualGroup?.admin._id === us._id}
                            key={us._id}
                            style={{...styles.userContainer, borderColor:theme.disabledColor}}
                        >
                            <View style={styles.dataUser}>
                                {(isDeletingUsers && actualGroup?.admin._id !== us._id && !usersSelected.includes(us._id)) && (
                                    <View style={styles.iconSelect}>
                                        <Icon 
                                            name='radio-button-off-outline'
                                            size={25}
                                            color={theme.colors.text}
                                        />
                                    </View>
                                )}
                                {(isDeletingUsers && actualGroup?.admin._id !== us._id && usersSelected.includes(us._id)) && (
                                    <View style={styles.iconSelect}>
                                        <Icon 
                                            name='radio-button-on-outline'
                                            size={25}
                                            color={theme.colors.primary}
                                        />
                                    </View>
                                )}
                                <Image 
                                    style={styles.imageUser}
                                    source={(us.img)
                                        ? {uri:us.img} 
                                        : require('../../assets/user-not-img.png')
                                    }
                                />
                                <View>
                                    <Text style={{...styles.nameUser, color:theme.colors.text}}>{us?.name}</Text>
                                    <Text style={{color:theme.disabledColor}}>{us.email}</Text>
                                </View>
                            </View>
                            {(actualGroup?.admin._id === us._id) && (
                                <View>
                                    <Text style={{...styles.adminText, color:theme.colors.primary}}>ADMIN</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    )))}
                    {(actualGroup?.admin._id === user?._id && !isDeletingUsers) && (
                        <View style={styles.buttonsFooterContainer}>
                            <SecondaryButton text='Añadir usuarios' onPress={()=>navigation.navigate('AddUsersToGroup')}/>
                            <SecondaryButton text='Eliminar usuarios' onPress={()=>setIsDeletingUsers(true)}/>
                            <TouchableOpacity
                                onPress={onDeleteGroup}
                                style={styles.buttonsFooter}
                            >
                                <Text style={{...styles.buttonsFooterText, color:theme.errors}}>Eliminar grupo</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {(actualGroup?.admin._id === user?._id && isDeletingUsers) && (
                        <View style={styles.buttonsConfirmDelete}>
                            <SecondaryButton text='Cancelar' onPress={onCancelDelete}/>
                            {(usersSelected.length > 0) && (
                                <ButtonSubmit text='Eliminar' onPress={onDeleteUsers}/>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dataUserContainer:{
        marginTop:10,
        alignItems:'center',
        paddingHorizontal:20
    },
    imageContainer: {
        // borderWidth: 1,
        marginTop:60,
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
    imageGroup:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:2
    },
    nameContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
        marginBottom:15
    },
    nameGroup:{
        fontSize:30,
        fontWeight:'600'
    },
    listUsersContainer:{
        width:'100%',
        marginTop:20,
        // paddingHorizontal:20,
    },
    headerList:{
        marginVertical:10,
        alignSelf:'flex-start'
    },
    headerListText:{
        fontSize:18,
        fontWeight:'400'
    },
    userContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        // borderWidth:1,
        borderBottomWidth:1,
        paddingHorizontal:10,
        paddingVertical:5
    },
    dataUser:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5
    },
    iconSelect:{
        marginRight:5
    },
    imageUser:{
        width:50,
        height:50,
        borderRadius:100,
        marginRight:10
    },
    nameUser:{
        fontSize:18,
        fontWeight:'500'
    },
    adminText:{
        fontWeight:'500'
    },
    buttonsFooterContainer:{
        marginTop:20,
        height:120,
        // borderWidth:1,
        justifyContent:'space-between',
        marginBottom:50
    },
    buttonsFooter:{
        alignItems:'center',
        justifyContent:'center'
    },
    buttonsFooterText:{
        fontSize:18
    },
    buttonsConfirmDelete:{
        alignItems:'center',
        flexDirection:'row',
        height:80,
        justifyContent:'space-around',
        marginTop:30,
    }
});