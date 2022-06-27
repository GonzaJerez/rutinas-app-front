import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import { Group, GroupsResponse, CreateGroup, GetGroups, PutGroup, User, RoutineResponse, GetRoutines, Routine } from '../../interfaces/interfaces';
import { AuthContext } from '../auth/AuthContext';
import { addUsersToGroupApi, createGroupApi, CreateGroupProps, deleteGroupApi, DeleteGroupProps, deleteUsersFromGroupApi, getGroupsApi, GetGroupsProps, GroupsUsersProps, putGroupApi, PutGroupProps, GetRoutinesGroupsProps, getRoutinesInGroupsApi, leaveGroupApi } from '../../helpers/groups/groupsApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface ContextProps {
    listGroups:             Group[];
    listRoutinesInGroup:    Routine[];
    actualGroup:            Group | null;
    isLoadingGroups:        boolean;
    isLoadingMore:          boolean;
    isWaitingReqGroup:      boolean;
    getGroups:              ({ isLoadMore }: {isLoadMore?: boolean | undefined;}) => Promise<void>
    setGroupActual:         (group: Group) => void
    getRoutinesByGroup:     () => Promise<void>
    clearRoutinesInGroup:   () => void
    loadMoreGroups:         () => Promise<void>;
    loadMoreRoutinesInGroup:() => Promise<void>
    createGroup:            (body: CreateGroup) => Promise<void>
    updateGroup:            (body: PutGroup) => Promise<void>
    deleteGroup:            () => Promise<void>
    addUsersToGroup:        (body: {users: string[];}) => Promise<void>
    deleteUsersFromGroup:   (body: {users: string[];}) => Promise<void>
    leaveGroup:             (idGroup: string) => Promise<void>
}

export const GroupsContext = createContext({} as ContextProps)

export const GroupsProvider = ({children}:any) => {

    const {token, setIsModalOfflineOpen} = useContext(AuthContext)
    const [listGroups, setListGroups] = useState<Group[]>([])
    const [listRoutinesInGroup, setListRoutinesInGroup] = useState<Routine[]>([])
    const [actualGroup, setActualGroup] = useState<Group | null>(null)
    const [pageGroups, setPageGroups] = useState(1)
    const [pageGroupRoutines, setPageGroupRoutines] = useState(1)
    const [isLoadingGroups, setIsLoadingGroups] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [isWaitingReqGroup, setIsWaitingReqGroup] = useState(false);
    const limit = 10;

    /**
     * En cada cambio del listRoutines lo va a actualizar en el AsyncStorage
     * Lo unico que actualizo manual es cuando se elimina la última rutina y no queda ninguna,
     * ya que aca valido que no venga vacía (porque siempre va a venir vacía la primera vez
     * que se renderiza)
     */
    useEffect(()=>{
        if (listGroups.length === 0 ) return;
        AsyncStorage.setItem( 'groups', JSON.stringify(listGroups) )
    },[listGroups])

    useEffect(()=>{
        if (listRoutinesInGroup.length === 0 ) return;
        AsyncStorage.setItem( 'routinesGroup', JSON.stringify(listRoutinesInGroup) )
    },[listRoutinesInGroup])


    const getGroups = async({isLoadMore}:{isLoadMore?: boolean})=>{
        if (!token) return;
        const groupsStored = await AsyncStorage.getItem('groups') || ''

        if (!isLoadMore) {
            setIsLoadingGroups(true)
        }

        const args:GetGroupsProps = {token,page:pageGroups,limit}

        try {
            const {groups, msg}:GetGroups = await getGroupsApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups([...listGroups, ...groups])
            setPageGroups( pageGroups + 1 )
            // await AsyncStorage.setItem( 'groups', JSON.stringify([...listGroups, ...groups]) )

        } catch (err) {
            console.log(err);
            setListGroups(JSON.parse(groupsStored))
        }
        finally{
            setIsLoadingGroups(false)
            setIsLoadingMore(false)
        }
    }

    const setGroupActual = (group:Group)=>{
        setActualGroup(group)
    }

    const getRoutinesByGroup = async()=>{
        if (!token || !actualGroup) return;
        const routinesGroupStored = await AsyncStorage.getItem('routinesGroup') || ''

        setIsLoadingGroups(true)

        const args:GetRoutinesGroupsProps = {token,idGroup: actualGroup?._id}

        try {
            const {routines, msg}:GetRoutines = await getRoutinesInGroupsApi(args)

            if (msg) {
                console.log(msg);
            }
            
            setListRoutinesInGroup(routines)
            setPageGroupRoutines(pageGroupRoutines + 1)
        } catch (err) {
            console.log(err);
            setListRoutinesInGroup(JSON.parse(routinesGroupStored))
        }
        finally{
            setIsLoadingGroups(false)
        }
    }

    const clearRoutinesInGroup = ()=>{
        setListRoutinesInGroup([])
    }

    /**
     * Carga más grupos con un lazy load
     */
     const loadMoreGroups = async()=>{
        const network = await NetInfo.fetch()
        if(!network.isConnected){
            return;
        }

        if (listGroups.length === limit * (pageGroups - 1) ) {
            setIsLoadingMore(true)
            await getGroups({isLoadMore:true})
        }
    }

    /**
     * Carga más rutinas de grupo con un lazy load
     */
     const loadMoreRoutinesInGroup = async()=>{
        if (listRoutinesInGroup.length === limit * (pageGroupRoutines - 1) ) {
            await getRoutinesByGroup()
        }
    }

    const createGroup = async(body:CreateGroup)=>{
        if (!token) return;
        setIsWaitingReqGroup(true)
        
        const args:CreateGroupProps = {body,token} 

        try {
            const {group, msg}:GroupsResponse = await createGroupApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups([group, ...listGroups])
            setActualGroup(group)
            setIsWaitingReqGroup(false)

        } catch (err) {
            console.log(err);
            const network = await NetInfo.fetch()
            if (!network.isConnected) {
                setIsModalOfflineOpen(true)
            }
        }
    }

    const updateGroup = async(body:PutGroup) => {
        if (!token || !actualGroup) return;
        setIsWaitingReqGroup(true)
        const args:PutGroupProps = {body,token,idGroup: actualGroup?._id} 

        try {
            const {group, msg}:GroupsResponse = await putGroupApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups(listGroups.map( el => el._id.toString() !== actualGroup._id
                ? el
                : group
            ))
            setActualGroup(group)
            setIsWaitingReqGroup(false)

        } catch (err) {
            console.log(err);
            const network = await NetInfo.fetch()
            if (!network.isConnected) {
                setIsModalOfflineOpen(true)
            }
        }
    }

    const deleteGroup = async() => {
        if (!token || !actualGroup) return;
        const args:DeleteGroupProps = {token,idGroup:actualGroup?._id} 

        try {
            const {group, msg}:GroupsResponse = await deleteGroupApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups(listGroups.filter( group => group._id.toString() !== actualGroup._id.toString() && group ))
            setActualGroup(null)

            if (listGroups.length === 1) {
                await AsyncStorage.setItem( 'groups','')
            }

        } catch (err) {
            console.log(err);
            const network = await NetInfo.fetch()
            if (!network.isConnected) {
                setIsModalOfflineOpen(true)
            }
        }
    }

    const addUsersToGroup = async(body:{users:string[]})=>{
        if (!token || !actualGroup) return;
        setIsWaitingReqGroup(true)
        const args:GroupsUsersProps = {token,idGroup:actualGroup?._id,body}

        try {
            const {group, msg}:GroupsResponse = await addUsersToGroupApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups(listGroups.map( el => el._id.toString() !== actualGroup._id
                ? el
                : group
            ))
            setActualGroup(group)
            setIsWaitingReqGroup(false)

        } catch (err) {
            console.log(err);
            const network = await NetInfo.fetch()
            if (!network.isConnected) {
                setIsModalOfflineOpen(true)
            }
        }
    }

    const deleteUsersFromGroup = async(body:{users:string[]})=>{
        if (!token || !actualGroup) return;
        setIsWaitingReqGroup(true)
        const args:GroupsUsersProps = {token,idGroup:actualGroup._id,body}

        try {
            const {group, msg}:GroupsResponse = await deleteUsersFromGroupApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups(listGroups.map( el => el._id.toString() !== actualGroup._id
                ? el
                : group
            ))
            setActualGroup(group)
            setIsWaitingReqGroup(false)

        } catch (err) {
            console.log(err);
            const network = await NetInfo.fetch()
            if (!network.isConnected) {
                setIsModalOfflineOpen(true)
            }
        }
    }

    const leaveGroup = async(idGroup:string)=>{
        if (!token) return;
        setIsWaitingReqGroup(true)
        const args:DeleteGroupProps = {token,idGroup}

        try {
            const {group, msg}:GroupsResponse = await leaveGroupApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups(listGroups.filter( el => el._id.toString() !== idGroup && el))
            setActualGroup(null)
            setIsWaitingReqGroup(false)

            if (listGroups.length === 1) {
                await AsyncStorage.setItem( 'groups','')
            }

        } catch (err) {
            console.log(err);
            const network = await NetInfo.fetch()
            if (!network.isConnected) {
                setIsModalOfflineOpen(true)
            }
        }
    }

    return (
        <GroupsContext.Provider
            value={{
                listGroups,
                listRoutinesInGroup,
                actualGroup,
                isLoadingGroups,
                isLoadingMore,
                isWaitingReqGroup,
                getGroups,
                setGroupActual,
                getRoutinesByGroup,
                clearRoutinesInGroup,
                loadMoreGroups,
                loadMoreRoutinesInGroup,
                createGroup,
                updateGroup,
                deleteGroup,
                addUsersToGroup,
                deleteUsersFromGroup,
                leaveGroup
            }}
        >
            {children}
        </GroupsContext.Provider>
    )
}
