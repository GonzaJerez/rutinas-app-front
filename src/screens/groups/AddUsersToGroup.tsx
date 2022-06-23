import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SearchInput } from '../../components/form/SearchInput'
import { SearchUsers } from '../../components/SearchUsers'
import { useSearchUsersOrGroups } from '../../hooks/useSearchUsersOrGroups'
import { GroupsContext } from '../../context/groups/GroupsContext'
import { AuthContext } from '../../context/auth/AuthContext'
import { SecondaryButton } from '../../components/buttons/SecondaryButton'
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSocialNavigator } from '../../router/SocialNavigator'

interface Props extends NativeStackScreenProps<RootSocialNavigator,'AddUsersToGroup'>{}

export const AddUsersToGroup = ({navigation}:Props) => {

    const {actualGroup,addUsersToGroup} = useContext(GroupsContext)

    const [userSearch, setUserSearch] = useState('')

    const {searchState,onToggleSelect} = useSearchUsersOrGroups({word:userSearch})

    const onAddUsers = async()=>{
        const idsUsersToAdd = searchState.selectedUsers.map( us => us._id)
        await addUsersToGroup({users:idsUsersToAdd})
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <SearchInput onChange={setUserSearch}/>

            <View style={styles.listFoundUsers}>
                <SearchUsers 
                    searchState={searchState}
                    userSearch={userSearch}
                    onToggleSelect={onToggleSelect}
                    userAlreadyExist={actualGroup?.users}
                />
            </View>

            <View style={styles.containerButtons}>
                <SecondaryButton text='Cancelar' onPress={navigation.goBack}/>
                {(searchState.selectedUsers.length > 0) && (
                    <ButtonSubmit text='Añadir usuarios' onPress={onAddUsers} style={{width:190}}/>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        paddingTop:20
    },
    listFoundUsers:{
        width:'100%',
        marginTop:20,
        paddingHorizontal:20,
        height:500
    },
    containerButtons:{
        flexDirection:'row',
        // borderWidth:1,
        width:'100%',
        justifyContent: 'space-evenly',
        alignItems:'center'
    }
});