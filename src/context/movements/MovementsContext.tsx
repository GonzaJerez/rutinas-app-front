import React,{ createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Alert } from 'react-native';
import notifee from '@notifee/react-native';

import { AuthContext } from "../auth/AuthContext";
import { baseURL } from "../../api/routinesApi";
import { MovementResponse, Movement } from '../../interfaces/interfaces';
import { getMovementsApi, GetMovementsProps } from '../../helpers/movements/movemetsApi';

interface MovementsProps {
    // sendRoutine:    (idRoutine: string, uidReceiver: string) => void;
    listMovements:  Movement[];
    socket:         Socket;
    isLoading:      boolean;
    newMovement:    (movement: Movement) => void;
    loadMoreMovements: () => Promise<void>
}

export const MovementsContext = createContext({} as MovementsProps)

export const MovementsProvider = ({children}:any)=>{

    const {token} = useContext(AuthContext)
    const [listMovements, setMovements] = useState<Movement[]>([])
    const [socket, setSocket] = useState(io())
    const [page, setPage] = useState(1)
    const [isLoading, setisLoading] = useState(false)
    const limit = 10;

    useEffect(()=>{
        if (!token) return;

        getMovements()
        
        const connectSocket = async() =>{
            await connect()
        }
        connectSocket()
    },[token])
    
    
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
            /* Alert.alert(
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
            ) */

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


    const getMovements = async()=>{
        if (!token) return;
        setisLoading(true)

        const args:GetMovementsProps = {token,page,limit}

        try {
            const {movements, msg}:MovementResponse = await getMovementsApi(args) 
            if (msg) {
                console.log(msg);
            }
            
            setMovements([...listMovements, ...movements])
            setPage( page + 1)
            setisLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    const loadMoreMovements = async()=>{
        if (listMovements.length === limit * (page - 1) ) {
            await getMovements()
        }
    }

    const newMovement = (movement:Movement)=>{
        setMovements([movement, ...listMovements])
    }

    return (
        <MovementsContext.Provider
            value={{
                listMovements,
                socket,
                isLoading,
                newMovement,
                loadMoreMovements
            }}
        >
            {children}
        </MovementsContext.Provider>
    )
}

