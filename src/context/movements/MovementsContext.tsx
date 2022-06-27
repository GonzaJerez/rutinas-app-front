import React,{ createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';

import { AuthContext } from "../auth/AuthContext";
import { baseURL } from "../../api/routinesApi";
import { MovementResponse, Movement } from '../../interfaces/interfaces';
import { getMovementsApi, GetMovementsProps } from '../../helpers/movements/movemetsApi';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';

interface MovementsProps {
    // sendRoutine:    (idRoutine: string, uidReceiver: string) => void;
    listMovements:  Movement[];
    socket:         Socket;
    isLoading:      boolean;
    isLoadingMore:  boolean;
    getMovements:   ({ isLoadMore }: {isLoadMore?: boolean | undefined;}) => Promise<void>
    newMovement:    (movement: Movement) => void;
    loadMoreMovements: () => Promise<void>
    updateMovement: (idMovement: string, status: "Pending" | "Accepted" | "Rejected") => Promise<void>
}

export const MovementsContext = createContext({} as MovementsProps)

export const MovementsProvider = ({children}:any)=>{

    const {token, user} = useContext(AuthContext)
    const [listMovements, setMovements] = useState<Movement[]>([])
    const [socket, setSocket] = useState(io())
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const limit = 10;

    useEffect(()=>{
        if (!token) return;

        getMovements({isLoadMore:false})
        
        const connectSocket = async() =>{
            await connect()
        }
        connectSocket()
    },[token])

    /**
     * En cada cambio del listRoutines lo va a actualizar en el AsyncStorage
     * Lo unico que actualizo manual es cuando se elimina la última rutina y no queda ninguna,
     * ya que aca valido que no venga vacía (porque siempre va a venir vacía la primera vez
     * que se renderiza)
     */
    useEffect(()=>{
        if (listMovements.length === 0 ) return;
        AsyncStorage.setItem( 'movements', JSON.stringify(listMovements) )
    },[listMovements])
    
    
    const connect = async()=>{
        if (!token) return;

        // Conecta usuario a socket
        setSocket(io(baseURL,{
            'extraHeaders' : {
                'x-token': token
            }
        }));
        console.log('connectSocket');

        socket.on('receiveRoutine', ({from, routine, idMovement})=>{
            Alert.alert(
                `Rutina recibida`,
                `${from.name} te ha enviado una rutina`,
                [
                    {
                        text:'Aceptar',
                        onPress:()=>{
                            socket.emit('routineSendingResponse', {
                                idRoutine: routine._id,
                                idMovement,
                                accepted: true,
                                from: from
                            })
                        }
                    },
                    {
                        text:'Cancelar',
                        onPress:()=>{
                            socket.emit('routineSendingResponse', {
                                idRoutine: routine._id,
                                idMovement,
                                accepted: false,
                                from: from
                            })
                        }
                    }
                ],
                {
                    cancelable:true
                }
            )

            console.log('va por aca');
            
            onDisplayNotification();
        })

        socket.on('statusSendRoutine', payload => {
            console.log(payload);
        }) 

    }

    const onDisplayNotification = async() => {
        // Create a channel
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        // Display a notification
        await notifee.displayNotification({
          title: 'Notification Title',
          body: 'Main body content of the notification',
          android: {
            channelId,
            // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          },
        });
      }


    const getMovements = async({isLoadMore}:{isLoadMore?: boolean})=>{
        if (!token) return;
        const movementsStored = await AsyncStorage.getItem('movements') || ''

        if (!isLoadMore) {
            setIsLoading(true)
        }

        const args:GetMovementsProps = {token,page,limit}

        try {
            const {movements, msg}:MovementResponse = await getMovementsApi(args) 
            if (msg) {
                console.log(msg);
            }
            
            setMovements([...listMovements, ...movements])
            setPage( page + 1)

        } catch (err) {
            console.log(err);
            setMovements(JSON.parse(movementsStored))
        }
        finally{
            setIsLoading(false)
            setIsLoadingMore(false)
        }
    }

    const loadMoreMovements = async()=>{
        const network = await NetInfo.fetch()
        if(!network.isConnected){
            return;
        }
        
        if (listMovements.length === limit * (page - 1) ) {
            setIsLoadingMore(true)
            await getMovements({isLoadMore:true})
        }
    }

    const newMovement = (movement:Movement)=>{
        setMovements([movement, ...listMovements])
    }

    const updateMovement = async(idMovement:string, status:"Pending" | "Accepted" | "Rejected")=>{
        setMovements(listMovements.map( move => move._id !== idMovement
            ? move
            : {
                ...move,
                to: move.to.map( userTo => userTo._id !== user?._id 
                    ? userTo
                    : {
                        ...userTo,
                        status
                    }
                )
            } 
        ))
    }

    return (
        <MovementsContext.Provider
            value={{
                listMovements,
                socket,
                isLoading,
                isLoadingMore,
                getMovements,
                newMovement,
                loadMoreMovements,
                updateMovement
            }}
        >
            {children}
        </MovementsContext.Provider>
    )
}

