import React, { useContext } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { ThemeContext } from '../context/theme/ThemeContext';
import { Group, User } from '../interfaces/interfaces';
import { SearchStateProps } from '../hooks/useSearchUsersOrGroups'

interface Props {
    userSearch:     string;
    searchState:    SearchStateProps;
    onToggleSelect: ({ user, group }: {user?: User | undefined;group?: Group | undefined; }) => void
}

export const SearchGroups = ({userSearch,searchState, onToggleSelect}:Props) => {

    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    return (
        <FlatList 
            data={(userSearch === '') ? searchState.selectedGroups : searchState.resultGroups }
            renderItem={({item})=>(

                <TouchableOpacity 
                    activeOpacity={0.9}
                    style={{
                        ...styles.foundUser,
                        backgroundColor:(searchState.selectedGroups.find(el => el._id === item._id) 
                            ? theme.lightPrimary 
                            : theme.colors.background
                        )
                    }}
                    onPress={()=>onToggleSelect({group:item})}
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
    },
    nameUser:{
        fontSize:18,
        fontWeight:'500'
    },
});