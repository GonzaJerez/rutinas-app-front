import React, {useReducer, createContext} from 'react';
import { UserResponse, LoginData, RegisterData } from '../../interfaces/interfaces';
import { AuthReducer, initialState } from './AuthReducer';
import { routinesApi } from "../../api/routinesApi";


interface AuthContextProps {
    status: 'authenticated' | 'checking' | 'not-authenticated',
    user: UserResponse | null,
    token: string | null,
    errorMsg: string | null,
    login: ({ email, password }: LoginData) => Promise<void>,
    register: ({ email, password, name }: RegisterData) => Promise<void>,
    googleSignIn: ({ idToken }: { idToken: string }) => Promise<void>,
    logout: ()=>void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({children}:any) => {

    const [state, dispatch] = useReducer(AuthReducer, initialState)
    

    const login = async({email, password}:LoginData)=>{
        try {
            const {token, user, msg} = await routinesApi({
                endpoint: '/auth/login',
                body: {email, password},
                method: 'POST',
                token: ''
            })
            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload: {
                    token,
                    user
                }})
            }
        } catch (error) {
            console.log(error);
        }
    }

    const googleSignIn = async({idToken}:{idToken:string})=>{
        try {
            const {token, user, msg} = await routinesApi({
                body: {idToken},
                endpoint: '/auth/google',
                method: 'POST',
                token:'' 
            })

            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload:{
                    token,
                    user
                }});
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const register = async({email, password, name}:RegisterData)=>{
        try {
            const {token, user, msg} = await routinesApi({
                endpoint: '/users',
                body: {email, password, name},
                method: 'POST',
                token:''
            })
            if (msg) {
                dispatch({type:'addError', payload:msg})
            } else {
                dispatch({type:'login', payload: {
                    token: token,
                    user: user
                }})
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = ()=>{}

    return(
        <AuthContext.Provider value={{
            ...state,
            login,
            register,
            googleSignIn,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}