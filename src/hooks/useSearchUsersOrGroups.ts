import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../context/auth/AuthContext";
import { MovementsContext } from "../context/movements/MovementsContext";
import { searchInCollectionApi, SearchProps } from "../helpers/searchApi";
import { Movement, Routine, User, UserAndGroup, Group, SearchUsersInDB } from '../interfaces/interfaces';
import { months } from "../components/cards/CardMovement";

interface Props {
    word:string;
    routine?: Routine;
    setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface SearchStateProps {
    resultUsers:    User[],
    resultGroups:   Group[],
    selectedUsers:  User[],
    selectedGroups: Group[]
}


export const useSearchUsersOrGroups = ({routine,word,setIsModalOpen}:Props)=>{

    const {token,user} = useContext(AuthContext)
    const {socket, newMovement} = useContext(MovementsContext)

    /**
     * Estado maneja las busquedas y los elementos seleccionados
     */
    const [searchState, setSearchState] = useState<SearchStateProps>({
        resultUsers: [],
        resultGroups: [],
        selectedUsers: [],
        selectedGroups: []
    })

    const [error, setError] = useState<string>()

    const {navigate} = useNavigation<any>()

    useEffect(()=>{
        searchInCollection()
    },[word])

    /**
     * Busca el string ingresado e inserta el resultado en c/u de las keys de resultados
     */
    const searchInCollection = async()=>{
        if (!token) return;

        if (word === '') {
            return setSearchState({
                ...searchState,
                resultUsers: [],
                resultGroups: []
            })
        }

        const args:SearchProps = {
            collection: 'UsersAndGroups',
            token,
            word
        }

        try {
            const {results,msg}:SearchUsersInDB = await searchInCollectionApi(args)

            if (msg) {
                setError(msg)
            }
            
            setSearchState({
                ...searchState,
                resultUsers: results.users,
                resultGroups: results.groups
            })
            
        } catch (error) {
            
        }
    }

    /**
     * Alerta para confirmar que el usuario quiere enviar la rutina a los usuarios o grupos seleccionados
     */
    const onConfirmSend = (usersReceiver:UserAndGroup[], type:'Users'|'Groups') => {
        const usersIds = usersReceiver.map( user => user._id)

        /**
         * Convierte a string los users/grupos seleccionados para mostrarselos al usuario
         */
        const listNamesUsers = usersReceiver.map( (user,index) => index === usersReceiver.length - 1 && usersReceiver.length > 1
            ? `y ${user.name}`
            : user.name    
        )
        const namesUsers = listNamesUsers.join(', ').replace(', y',' y')
        
        Alert.alert(
            `Enviar rutina a ${namesUsers}`,
            'Se enviará una copia de la rutina, usted seguirá teniendo la original en su cuenta',
            [
                {
                    text:'Cancelar',
                    onPress:()=>console.log('cancelado'),
                },
                {
                    text:'Enviar',
                    onPress:()=>{
                        if (!setIsModalOpen || !routine) return;
                        sendRoutine(routine._id, usersIds,type)
                        onCloseModal()
                    }
                }
            ],
            {
                cancelable:true,
            }
        )
    }

    /**
     * Envia la rutina al backend y este le responde cuando es enviada correctamente 
     */
     const sendRoutine = (idRoutine:string, uidReceiver:string[], type:'Users'|'Groups')=>{
        socket.emit('sendRoutine',{idRoutine, uidReceiver, type}, (resp:{movement:Movement, nameRoutine:string}) =>{
            
            newMovement(resp.movement);
            const isSent = ( resp.movement.from._id === user?._id )
            const dateMovement = new Date(resp.movement.date)
            const dateSpanishFormat = `${dateMovement.getDate()} de ${months[dateMovement.getMonth()]}, ${dateMovement.getFullYear()}`
            
            Alert.alert(
                'Envío exitoso!',
                `La rutina ${resp.nameRoutine} se envió correctamente`,
                [{
                    text: 'Cerrar',
                },{
                    text:'Ver detalle',
                    onPress:()=>{ navigate('SocialNavigator',{
                        screen: 'DetailsMovementScreen',
                        params:{
                            movement: resp.movement,
                            isSent,
                            dateSpanishFormat
                        }
                    })}
                }],{
                    cancelable:true
                }
            )
            
        })
    }

    /**
     * Maneja los elementos seleccionados en cada seccion (user o group)
     */
    const onToggleSelect = ({user,group}:{user?:User, group?:Group})=>{
        if (user) {
            if (searchState.selectedUsers.find(us => us._id === user._id)) {
                setSearchState({
                    ...searchState,
                    selectedUsers: searchState.selectedUsers.filter( us => us._id !== user._id && us)
                })
            } else {
                setSearchState({
                    ...searchState,
                    selectedUsers: [...searchState.selectedUsers, user]
                })
            }

        }
        if (group) {
            if (searchState.selectedGroups.find(el => el._id === group._id)) {
                setSearchState({
                    ...searchState,
                    selectedGroups: searchState.selectedGroups.filter( el => el._id !== group._id && el)
                })
            } else {
                setSearchState({
                    ...searchState,
                    selectedGroups: [...searchState.selectedGroups, group]
                })
            }
        }
    }

    /**
     * Cierra modal y limpia los elementos seleccionados
     */
    const onCloseModal = ()=>{
        if (!setIsModalOpen) return;
        setIsModalOpen(false);
        setSearchState({
            ...searchState,
            selectedUsers:[],
            selectedGroups:[],
            resultGroups: [],
            resultUsers: []
        })
    }

    return {
        searchState,
        setSearchState,
        onToggleSelect,
        onCloseModal,
        onConfirmSend
    }
}