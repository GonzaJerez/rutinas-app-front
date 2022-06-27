import { NewPasswordProps, SecurityCodeProps, SendEmailProps } from '../helpers/auth/authApis';
import { CreateGroup, RoutineCreateState, Set, PutGroup, UpdateProfile, UpdateEmail, UpdatePassword, CombinedWorkout, Day, DefaultRoutine } from '../interfaces/interfaces';

// DESARROLLO
// export const baseURL = 'http://192.168.100.18:8080'

// PRUEBAS DESARROLLO
export const baseURL = 'https://routines-app.herokuapp.com'

// PARA CUANDO HAGA DEPLOY
/* export const baseURL = (process.env.NODE_ENV !== 'production')
    ? 'http://192.168.100.18:8080' 
    : 'https://routines-app.herokuapp.com' */


type Body = 
    | {email: string,password: string,name?: string}
    | {idToken: string | null}
    | {sets: Set[]}
    | Day
    | RoutineCreateState
    | DefaultRoutine
    | UpdateProfile
    | UpdateEmail
    | UpdatePassword
    | CombinedWorkout
    | {newWeights:number[]}
    | CreateGroup
    | PutGroup
    | {users:  string[]}
    | string
    | SendEmailProps
    | SecurityCodeProps
    | NewPasswordProps

type Form = 
    | UpdateProfile
    | PutGroup

interface Props {
    endpoint: string,
    method: string,
    token?: string,
    body?: Body
}

interface PropsFormData {
    endpoint: string,
    method: string,
    token?: string,
    form: Form
}

export const routinesApi = async({endpoint, method, token = '', body}:Props)=>{

    try {
        const resp = await fetch(`${baseURL}/api` + endpoint, {
            method,
            headers:{
                'Content-Type': 'Application/json',
                'x-token': token
            },
            body: JSON.stringify(body)
        })
        
        const data = await resp.json()
        
        return data;
    } catch (error) {
        console.log(error);
        
    }
}

export const routinesApiFormData = async({endpoint, method, token = '', form}:PropsFormData)=>{

    const formData = new FormData();

    Object.entries(form).forEach( el => {
        if (el[0] === 'img') {
            const fileToUpload = {
                uri: el[1].uri,
                type: el[1].type,
                name: el[1].fileName
            }
            formData.append(el[0], fileToUpload)
        } else {
            formData.append(el[0], el[1])
        }
    })

    try {
        const resp = await fetch(`${baseURL}/api` + endpoint, {
            method,
            headers:{
                'x-token': token
            },
            body: formData
        })
        
        const data = await resp.json()
        
        return data;
    } catch (error) {
        console.log(error);
        
    }
}