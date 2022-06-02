import { User, UserResponse } from '../../interfaces/interfaces';

export interface AuthState {
    status: 'authenticated' | 'checking' | 'not-authenticated',
    user:   User | null,
    token:  string | null,
    errorMsg: string | null,
}

type AuthAuthentication =
    | {type: 'login', payload: {token: string, user: User}}
    | {type: 'addError', payload: string}
    | {type: 'notAuthenticated'}
    // | {type: 'googleSignIn', payload: {idToken:string}}
    | {type: 'updateUser', payload:{user:User}}
    | {type: 'logout'}


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
        case 'updateUser':
            return {
                ...state,
                user: action.payload.user
            }
        case 'logout':
            return {
                ...state,
                user: null,
                token: null,
                status: 'not-authenticated'
            }
    
        default:
            return state;
    }
}