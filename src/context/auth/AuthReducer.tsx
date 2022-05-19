import { UserResponse } from "../../interfaces/interfaces";

export interface AuthState {
    status: 'authenticated' | 'checking' | 'not-authenticated',
    user:   UserResponse | null,
    token:  string | null,
    errorMsg: string | null,
}

type AuthAuthentication =
    | {type: 'login', payload: {token: string, user: UserResponse}}
    | {type: 'addError', payload: string}
    | {type: 'googleSignIn', payload: {idToken:string}}


export const initialState: AuthState = {
    errorMsg:   '',
    status:     'checking',
    token:      null,
    user:       null
}


export const AuthReducer = (state:AuthState, action:AuthAuthentication):AuthState => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                errorMsg: '',
                user: action.payload.user,
                token: action.payload.token,
                status: 'authenticated'
            }
        case 'addError':
            return{
                ...state,
                errorMsg: action.payload,
                user: null,
                token: null,
                status: 'not-authenticated'
            }
    
        default:
            return state;
    }
}