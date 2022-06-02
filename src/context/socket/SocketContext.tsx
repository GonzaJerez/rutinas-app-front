import React,{ createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';



const SocketContext = createContext({} as any)

export const SocketProvider = async({children}:any)=>{

    let socket:Socket
    const token = await AsyncStorage.getItem('token') || ''

    useEffect(()=>{
        if (!token) return;

        connectSocket()
    },[])


    const connectSocket = ()=>{
        // Conecta usuario a socket
        socket = io('http://192.168.100.18:8080',{
            'extraHeaders' : {
                'x-token': token
            }
        });

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
        })

        socket.on('statusSendRoutine', payload => {
            console.log(payload);
        })

        socket.on('sendSuccess', ({movement}) => {
            console.log(movement);
        })
    }

    const sendRoutine = (idRoutine:string, uidReceiver:string)=>{
        socket.emit('sendRoutine',{idRoutine, uidReceiver})
    }



    return (
        <SocketContext.Provider
            value={null}
        >
            {children}
        </SocketContext.Provider>
    )
}

