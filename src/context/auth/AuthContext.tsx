import React, {useReducer, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserResponse, LoginData, RegisterData, User, UpdateProfile, UpdateEmail, UpdatePassword } from '../../interfaces/interfaces';
import { AuthReducer, initialState } from './AuthReducer';
import { routinesApi } from "../../api/routinesApi";
import { updateUserApi } from '../../helpers/auth/userApis';
import { googleSignInApi, loginApi, registerApi, validateAuth } from '../../helpers/auth/authApis';


interface AuthContextProps {
    status: 'authenticated' | 'checking' | 'not-authenticated',
    user: User | null,
    token: string | null,
    errorMsg: string | null,
    login: ({ email, password }: LoginData) => Promise<void>,
    register: ({ email, password, name }: RegisterData) => Promise<void>,
    googleSignIn: (idToken: string) => Promise<void>
    logout: ()=>void;
    updateUser: (body: UpdateProfile | UpdateEmail | UpdatePassword) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({children}:any) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    useEffect( () => {
        checkToken()
    }, [] )

    const checkToken = async () => {
        const tokenStored = await AsyncStorage.getItem( 'token' );
        if ( !tokenStored ) return dispatch( { type: 'logout' } );

        const {user,token,msg}:UserResponse = await validateAuth(tokenStored)
        if (msg) {
            return dispatch({type:'logout'})
        }

        await AsyncStorage.setItem( 'token', token )
        dispatch( {
            type: 'login', payload: {
                token: token,
                user: user
            }
        } )
    }
    

    const login = async(body:LoginData)=>{
        try {
            const {token, user, msg}:UserResponse = await loginApi(body)
            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload: {
                    token,
                    user
                }})
            }
            await AsyncStorage.setItem( 'token', token )
        } catch (error) {
            console.log(error);
        }
    }

    const googleSignIn = async(idToken:string)=>{
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
    }

    const register = async(body:RegisterData)=>{
        try {
            const {token, user, msg} = await registerApi(body)
            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload: {
                    token: token,
                    user: user
                }})
            }
            await AsyncStorage.setItem( 'token', token )
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async()=>{
        dispatch({type:'logout'})
        await AsyncStorage.removeItem( 'token' )
    }

    const updateUser = async(body:UpdateProfile | UpdateEmail | UpdatePassword)=> {
        if(!state.token || !state.user?.uid) return;

        const args = {
            uid: state.user?.uid,
            body,
            token: state.token
        }

        try {
            const {user}:UserResponse = await updateUserApi(args)
            
            if (user.msg) {
                dispatch({type:'addError', payload:user.msg})
            }
            dispatch({type:'updateUser', payload:{user}})
            
        } catch (err) {
            console.log(err);
        }
    }

    return(
        <AuthContext.Provider value={{
            ...state,
            login,
            register,
            googleSignIn,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}