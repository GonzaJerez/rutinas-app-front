import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSocialTopNavigator } from '../router/SocialTopNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GroupsContext } from '../context/groups/GroupsContext'
import { ThemeContext } from '../context/theme/ThemeContext'
import { Group } from '../interfaces/interfaces';
import { useSearchUsersOrGroups } from '../hooks/useSearchUsersOrGroups'
import { GradientBackground } from '../components/backgrounds/GradientBackground'
import { CardGroup } from '../components/cards/CardGroup'
import { SearchInput } from '../components/form/SearchInput'
import { Swipeable } from 'react-native-gesture-handler';
import { RightSwipe } from '../components/swipers/RightSwipe';
import { ListCardPlaceholder } from '../components/placeholders/ListCardPlaceholder';
import { SecondaryButton } from '../components/buttons/SecondaryButton';
import { ScreenEmpty } from '../components/ScreenEmpty';

interface Props extends NativeStackScreenProps<RootSocialTopNavigator,'GroupsScreen'>{}

export const GroupsScreen = ({navigation}:Props) => {

    useEffect(()=>{
        getGroups({isLoadMore:false})
    },[])

    const {listGroups, isLoadingGroups,isLoadingMore, getGroups, loadMoreGroups, setGroupActual,leaveGroup} = useContext(GroupsContext)
    const {theme} = useContext(ThemeContext)

    const [searchGroup, setSearchGroup] = useState('')
    const [isRefreshing, setIsRefreshing] = useState(false)
    
    const {searchState} = useSearchUsersOrGroups({word:searchGroup})
    
    const onSelectGroup = (group:Group)=>{
        setGroupActual(group)
        navigation.navigate('GroupRoutinesScreen')
    }

    const onLeaveGroup = (idGroup:string)=>{
        Alert.alert(
            'Abandonar grupo',
            '¿Estás seguro que deseas abandonar el grupo? Ya no podrás ver las rutinas del mismo',
            [{
                text:'Cancelar'
            },{
                text:'Confirmar',
                onPress: async()=> await leaveGroup(idGroup)
            }],
            {
                cancelable:true
            }
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <GradientBackground />

            <SearchInput onChange={setSearchGroup}/>

            <SecondaryButton 
                text='Crear nuevo grupo'
                onPress={()=>navigation.navigate('CreateGroupScreen')}
                style={styles.newGroupButton}
            />

            {(listGroups.length === 0) && (
                <ScreenEmpty text='No perteneces a ningún grupo aún'/>
            )}
            
            {(isLoadingGroups)
                ? (<ListCardPlaceholder />)
                : (
                    <View style={styles.groupsContainer}>
                        <FlatList 
                            data={(searchGroup === '') ? listGroups : searchState.resultGroups}
                            renderItem={({item})=>(
                                <View style={{paddingVertical:15}}>
                                    <Swipeable
                                        renderRightActions={()=>(<RightSwipe id={item._id} text='Abandonar' onDelete={onLeaveGroup} />)}
                                        overshootRight={false}
                                    >
                                        <CardGroup 
                                            group={item}
                                            onPress={()=>onSelectGroup(item)}
                                        />
                                    </Swipeable>
                                </View>
                            )}
                            keyExtractor={(item)=>(item._id)}
                            onEndReached={loadMoreGroups}
                            ListFooterComponent={()=>(
                                <View style={styles.footer}>
                                    {(isLoadingMore)
                                        ? (
                                            <ActivityIndicator 
                                                color={theme.colors.primary}
                                            />
                                        )
                                        : (listGroups.length > 0) && (
                                                <Text style={{color:theme.disabledColor}}>No hay más resultados</Text>
                                            )
                                    }
                                </View>
                            )}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={isRefreshing}
                                    onRefresh={()=>getGroups({isLoadMore:false})}
                                    progressBackgroundColor={theme.colors.background}
                                    colors={[theme.colors.primary]}
                                />
                            }
                        />
                    </View>
                )
            }
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center'
    },
    newGroupButton:{
        marginVertical:20,
    },
    groupsContainer: {
        width:'100%',
        // marginBottom:120,
        // paddingBottom:140,
        overflow:'hidden',
    },
    footer:{
        height:140,
        alignItems:'center',
    }
});