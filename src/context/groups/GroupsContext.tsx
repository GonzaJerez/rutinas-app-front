import React, { useContext, useEffect, useState } from 'react';
import { createContext } from "react";
import { Group, GroupsResponse, CreateGroup, GetGroups, PutGroup, User, RoutineResponse, GetRoutines, Routine } from '../../interfaces/interfaces';
import { AuthContext } from '../auth/AuthContext';
import { addUsersToGroupApi, createGroupApi, CreateGroupProps, deleteGroupApi, DeleteGroupProps, deleteUsersFromGroupApi, getGroupsApi, GetGroupsProps, GroupsUsersProps, putGroupApi, PutGroupProps, GetRoutinesGroupsProps, getRoutinesInGroupsApi, leaveGroupApi } from '../../helpers/groups/groupsApis';

interface ContextProps {
    listGroups:             Group[];
    listRoutinesInGroup:    Routine[];
    actualGroup:            Group | null;
    isLoadingRoutinesGroup: boolean;
    isWaitingReqGroup:      boolean;
    getGroups:              () => Promise<void>;
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

    const {token} = useContext(AuthContext)
    const [listGroups, setListGroups] = useState<Group[]>([])
    const [listRoutinesInGroup, setListRoutinesInGroup] = useState<Routine[]>([])
    const [actualGroup, setActualGroup] = useState<Group | null>(null)
    const [pageGroups, setPageGroups] = useState(1)
    const [pageGroupRoutines, setPageGroupRoutines] = useState(1)
    const [isLoadingRoutinesGroup, setIsLoadingRoutineGroup] = useState(false)
    const [isWaitingReqGroup, setIsWaitingReqGroup] = useState(false);
    const limit = 10;


    const getGroups = async()=>{
        if (!token) return;
        setIsLoadingRoutineGroup(true)
        const args:GetGroupsProps = {token,page:pageGroups,limit}

        try {
            const {groups, msg}:GetGroups = await getGroupsApi(args)

            if (msg) {
                console.log(msg);
            }

            setListGroups([...listGroups, ...groups])
            setPageGroups( pageGroups + 1 )
            setIsLoadingRoutineGroup(false)

        } catch (err) {
            console.log(err);
        }
    }

    const setGroupActual = (group:Group)=>{
        setActualGroup(group)
    }

    const getRoutinesByGroup = async()=>{
        if (!token || !actualGroup) return;
        setIsLoadingRoutineGroup(true)
        const args:GetRoutinesGroupsProps = {token,idGroup: actualGroup?._id}

        try {
            const {routines, msg}:GetRoutines = await getRoutinesInGroupsApi(args)

            if (msg) {
                console.log(msg);
            }

            setListRoutinesInGroup(routines)
            setPageGroupRoutines(pageGroupRoutines + 1)
            setIsLoadingRoutineGroup(false)
        } catch (err) {
            console.log(err);
        }
    }

    const clearRoutinesInGroup = ()=>{
        setListRoutinesInGroup([])
    }

    /**
     * Carga más grupos con un lazy load
     */
     const loadMoreGroups = async()=>{
        if (listGroups.length === limit * (pageGroups - 1) ) {
            await getGroups()
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

        } catch (err) {
            console.log(err);
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

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <GroupsContext.Provider
            value={{
                listGroups,
                listRoutinesInGroup,
                actualGroup,
                isLoadingRoutinesGroup,
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
