import React, { useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { ThemeContext } from '../context/theme/ThemeContext';
import { Group, User } from '../interfaces/interfaces';
import { SearchStateProps } from '../hooks/useSearchUsersOrGroups'

/**
 * userAlreadyExist es el array donde estan los usuarios que ya existen en cierto grupo, solo viene
 * esta propiedad cuando el componente es llamado de "DetailsGroupScreen"
 */
interface Props {
    userSearch:         string;
    searchState:        SearchStateProps;
    onToggleSelect:     ({ user, group }: {user?: User | undefined;group?: Group | undefined; }) => void;
    userAlreadyExist?:  User[]
}

export const SearchUsers = ({userSearch,searchState, onToggleSelect,userAlreadyExist}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    return (
        <FlatList 
            data={(userSearch === '') ? searchState.selectedUsers : searchState.resultUsers }
            renderItem={({item})=>(

                <TouchableOpacity 
                    activeOpacity={0.9}
                    style={{
                        ...styles.foundUser,
                        backgroundColor: searchState.selectedUsers.find(user => user._id === item._id) 
                            ? theme.lightPrimary 
                            : theme.colors.background,
                        opacity: userAlreadyExist?.find( user => user._id === item._id)
                            ? 0.5
                            : 1
                    }}
                    onPress={()=>onToggleSelect({user:item})}
                    disabled={userAlreadyExist?.find( user => user._id === item._id) ? true : false}
                >
                    <View style={styles.dataUser}>
                        <View style={{...styles.imgUser, borderColor:theme.disabledColor}}>
                            <Image 
                                source={(item?.img) ? {uri:item.img} : require('../assets/user-not-img.png')}
                                style={{...styles.image, borderColor:colors.primary}}
                            />
                        </View>
                        <View>
                            <Text style={{...styles.nameUser, color:colors.text}}>{item.name}</Text>
                            <Text style={{color:theme.lightText}}>{item.email}</Text>
                        </View>
                    </View>
                    <View>
                        <Icon 
                            name='chevron-forward-outline'
                            size={30}
                            color={theme.lightText}
                        />
                    </View>
                    
                </TouchableOpacity>
            )}
            ListFooterComponent={()=>(
                <View style={{height:100}}/>
            )}
        />
    )
}

const styles = StyleSheet.create({
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
        flex:1
    },
    imgUser:{
        borderRadius:100,
        width:50,
        height:50,
        marginRight:20
    },
    image:{
        width:50,
        height:50,
        borderRadius:100,
    },
    nameUser:{
        fontSize:18,
        fontWeight:'500'
    },
});