import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootSocialNavigator } from '../../router/SocialNavigator';
import { GroupsContext } from '../../context/groups/GroupsContext';
import { ListHomeRoutines } from '../../components/ListHomeRoutines';
import { GradientBackground } from '../../components/backgrounds/GradientBackground';
import { AuthContext } from '../../context/auth/AuthContext';
import { ThemeContext } from '../../context/theme/ThemeContext';


interface Props extends NativeStackScreenProps<RootSocialNavigator,'GroupRoutinesScreen'>{}

export const GroupRoutinesScreen = ({navigation}:Props) => {

    const {listRoutinesInGroup,actualGroup, getRoutinesByGroup,clearRoutinesInGroup, loadMoreRoutinesInGroup} = useContext(GroupsContext)
    const {user} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)
    const isAdmin = (actualGroup?.admin._id === user?._id)

    /**
     * Custom header screen
     */
    useEffect(()=>{
        if(!actualGroup) return;
        navigation.setOptions({
            headerTitle: ()=>(
                <TouchableOpacity
                    onPress={()=>navigation.navigate('DetailsGroupScreen')}
                    style={styles.headerRow}
                >
                    <Image 
                        source={(actualGroup.img)
                            ? {uri: actualGroup.img}
                            : require('../../assets/user-not-img.png')
                        }
                        style={styles.imageGroup}
                    />
                    <Text style={{...styles.nameGroup, color:theme.whiteColor}}>{actualGroup.name}</Text>
                </TouchableOpacity>
            )
            
        })
    },[actualGroup])

    /**
     * Obtiene las rutinas del grupo
     */
    useEffect(()=>{
        getRoutinesByGroup()

        return ()=>{
            clearRoutinesInGroup()
        }
    },[])
    

    return (
        <View style={styles.container}>
            <GradientBackground />
            <ListHomeRoutines 
                routines={listRoutinesInGroup}
                loadMore={()=>loadMoreRoutinesInGroup()}
                swipeLeftUsable={false}
                isAdminRoutineGroup={isAdmin}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    headerRow:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    imageGroup: {
        width:40,
        height:40,
        marginRight:20,
        borderRadius:100
    },
    nameGroup:{
        fontSize:20
    },
    container:{
        flex:1
    }
});