import React, {useReducer, createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserResponse, LoginData, RegisterData, User, UpdateProfile, UpdateEmail, UpdatePassword } from '../../interfaces/interfaces';
import { AuthReducer, initialState } from './AuthReducer';
import { routinesApi } from "../../api/routinesApi";
import { updateUserApi, updateUserProfileApi, UpdateUserProfileProps, UpdateUserProps } from '../../helpers/auth/userApis';
import { googleSignInApi, loginApi, registerApi, validateAuth } from '../../helpers/auth/authApis';


interface AuthContextProps {
    status:             'authenticated' | 'checking' | 'not-authenticated',
    user:               User | null,
    token:              string | null,
    errorMsg:           string | null,
    isWaitingReqLogin:  boolean;
    isModalOfflineOpen: boolean;
    setIsModalOfflineOpen: React.Dispatch<React.SetStateAction<boolean>>
    login:              ({ email, password }: LoginData) => Promise<void>,
    register:           ({ email, password, name }: RegisterData) => Promise<void>,
    googleSignIn:       (idToken: string) => Promise<void>
    logout:             ()=>void;
    updateUser:         (body:UpdateEmail | UpdatePassword) => Promise<void>
    updateProfileUser:  (body: UpdateProfile) => Promise<void>
    setIsWaitingReqLogin: React.Dispatch<React.SetStateAction<boolean>>;
    clearErrors:           () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({children}:any) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState)
    const [isModalOfflineOpen, setIsModalOfflineOpen] = useState(false)
    const [isWaitingReqLogin, setIsWaitingReqLogin] = useState(false)

    useEffect( () => {
        checkToken()
        // AsyncStorage.clear()
    }, [] )

    const checkToken = async () => {
        const tokenStored = await AsyncStorage.getItem( 'token' ) || '';
        const userStored = await AsyncStorage.getItem( 'user' ) || '';
        // console.log(await AsyncStorage.getAllKeys());
        

        if ( !tokenStored ) return dispatch( { type: 'logout' } );

        try {
            const {user,token,msg}:UserResponse = await validateAuth(tokenStored)
            if (msg) {
                return dispatch({type:'logout'})
            }

            await AsyncStorage.setItem( 'token', token )
            await AsyncStorage.setItem( 'user', JSON.stringify(user) )
            
            dispatch( {
                type: 'login', payload: {
                    token: token,
                    user: user
                }
            } )
            
        } catch (err) {
            console.log(err);
            dispatch({type:'offline',payload:{user:JSON.parse(userStored),token:tokenStored}})
        }
    }
    

    const login = async(body:LoginData)=>{
        setIsWaitingReqLogin(true)
        try {
            const {token, user, msg}:UserResponse = await loginApi(body)
            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload: {
                    token,
                    user
                }})
                await AsyncStorage.setItem( 'token', token )
            }
        } catch (error) {
            console.log(error);
        }
        setIsWaitingReqLogin(false)
    }

    const googleSignIn = async(idToken:string)=>{
        setIsWaitingReqLogin(true)
        try {
            const {token, user, msg} = await googleSignInApi(idToken)

            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload:{
                    token,
                    user
                }});
            }
            await AsyncStorage.setItem( 'token', token )
        } catch (error) {
            console.log(error);
        }
        setIsWaitingReqLogin(false)
    }

    const register = async(body:RegisterData)=>{
        setIsWaitingReqLogin(true)
        try {
            const {token, user, msg} = await registerApi(body)
            
            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload: {
                    token: token,
                    user: user
                }})
                await AsyncStorage.setItem( 'token', token )
            }

            setIsWaitingReqLogin(false)
        } catch (error) {
            console.log(error);
            dispatch({type:'addError', payload:`Ocurrió un error, por favor comunicarse con el administrador`})
            setIsWaitingReqLogin(false)
        }
    }

    const logout = async()=>{
        dispatch({type:'logout'})
        await AsyncStorage.clear()
    }

    const updateUser = async(body:UpdateEmail | UpdatePassword)=> {
        if(!state.token || !state.user?._id) return;
        setIsWaitingReqLogin(true)

        const args:UpdateUserProps = {
            uid: state.user?._id,
            body,
            token: state.token
        }

        try {
            const {user}:UserResponse = await updateUserApi(args)
            
            if (user.msg) {
                dispatch({type:'addError', payload:user.msg})
            }
            dispatch({type:'updateUser', payload:{user}})
            setIsWaitingReqLogin(false)
            
        } catch (err) {
            console.log(err);
        }
    }

    const updateProfileUser = async(body:UpdateProfile)=> {
        if(!state.token || !state.user?._id) return;

        const args:UpdateUserProfileProps = {
            uid: state.user?._id,
            body,
            token: state.token
        }

        try {
            const {user}:UserResponse = await updateUserProfileApi(args)
            
            if (user.msg) {
                dispatch({type:'addError', payload:user.msg})
            }
            dispatch({type:'updateUser', payload:{user}})
            
        } catch (err) {
            console.log(err);
        }
    }

    const clearErrors = ()=>{
        dispatch({type:'addError',payload:''})
    }

    return(
        <AuthContext.Provider value={{
            ...state,
            isWaitingReqLogin,
            isModalOfflineOpen,
            setIsModalOfflineOpen,
            login,
            register,
            googleSignIn,
            logout,
            updateUser,
            updateProfileUser,
            setIsWaitingReqLogin,
            clearErrors
        }}>
            {children}
        </AuthContext.Provider>
    )
}