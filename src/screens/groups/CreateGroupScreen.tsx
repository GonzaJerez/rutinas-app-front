import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SearchInput } from '../../components/form/SearchInput'
import { useForm } from '../../hooks/useForm';
import { ThemeContext } from '../../context/theme/ThemeContext';
import { useSearchUsersOrGroups } from '../../hooks/useSearchUsersOrGroups';
import { SearchUsers } from '../../components/SearchUsers';
import { ButtonSubmit } from '../../components/buttons/ButtonSubmit';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootSocialNavigator } from '../../router/SocialNavigator';
import { GroupsContext } from '../../context/groups/GroupsContext';
import { User } from '../../interfaces/interfaces';
import { useKeyboardStatus } from '../../hooks/useKeyboardStatus';

interface Props extends NativeStackScreenProps<RootSocialNavigator,'CreateGroupScreen'>{}

interface FormState {
    name:           string;
    description:    string;
    users:          User[]
}

export const CreateGroupScreen = ({navigation}:Props) => {

    const {createGroup} = useContext(GroupsContext)
    const {theme} = useContext(ThemeContext)
    const {colors} = theme;

    const [userSearch, setUserSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    const {form, onChange,setFormValue} = useForm<FormState>({
        name: '',
        description: '',
        users: []
    })
    
    const {searchState,onToggleSelect} = useSearchUsersOrGroups({word:userSearch})
    
    const {isKeyboardVisible} = useKeyboardStatus()

    useEffect(()=>{
        navigation.setOptions({
            headerRight:()=>(
                <TouchableOpacity
                    onPress={onCreateGroup}
                    disabled={(form.name === '')}
                >
                    <Text style={{
                        color:(form.name === '') ? theme.disabledColor : colors.primary,
                        fontSize:16
                    }}>
                        Crear
                    </Text>
                </TouchableOpacity>
            )
        })
    },[form])

    useEffect(()=>{
        setFormValue({...form, users: searchState.selectedUsers})
    },[searchState])

    

    const onCreateGroup = ()=>{
        createGroup(form)
        navigation.replace('GroupRoutinesScreen')
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{
                ...styles.container,
                top:(isKeyboardVisible && isSearching) ? -310 : 0
                }}
            >
                <View style={ styles.nameContainer }>
                    <TextInput
                        style={ { ...styles.textInput, borderColor: colors.primary, color:colors.text } }
                        placeholder='Nombre de grupo'
                        placeholderTextColor={theme.placeholderColor}
                        value={form.name}
                        onChangeText={(value)=>onChange(value,'name')}
                        autoFocus
                    />
                </View>

                <View style={styles.descriptionContainer}>
                    <TextInput 
                        style={{...styles.descriptionInput,borderColor:colors.primary, color:colors.text}}
                        placeholder='Descripción'
                        placeholderTextColor={theme.placeholderColor}
                        value={form.description}
                        onChangeText={(value)=>onChange(value,'description')}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <Text style={{...styles.subtitle, color:colors.text}}>Añadir usuarios</Text>

                <SearchInput onChange={setUserSearch} setIsSearching={setIsSearching}/>

                {(userSearch === '' && searchState.selectedUsers.length === 0) && (
                    <View style={styles.emptyList}>
                        <Text style={{color:theme.disabledColor}}>Empieza a escribir para buscar usuarios</Text>
                    </View>
                )}

                <View style={styles.listFoundUsers}>
                    <SearchUsers 
                        userSearch={userSearch}
                        searchState={searchState}
                        onToggleSelect={onToggleSelect}
                    />
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
    },
    nameContainer: {
        marginTop: 30,
        width: 350
    },
    textInput: {
        borderBottomWidth: 1,
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 20
    },
    descriptionContainer:{
        marginTop:50,
        marginBottom:30
    },
    descriptionInput:{
        width:350,
        height:100,
        borderWidth:1,
        textAlignVertical:'top',
        paddingHorizontal:10,
        borderRadius:10
    },
    subtitle:{
        fontSize:20,
        marginBottom:20,
    },
    listFoundUsers:{
        width:'100%',
        marginTop:20,
        paddingHorizontal:20,
        height:500
    },
    emptyList:{
        marginTop:30
    }
});