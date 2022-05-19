import { CreateRoutine, CreateWorkout, Set, Workout } from '../interfaces/interfaces';
export const baseURL = 'http://192.168.100.18:8080/api'

type Body = 
    | {email: string,password: string,name?: string}
    | {idToken: string | null}
    | CreateRoutine
    | CreateWorkout
    | {sets: Set[]}

interface Props {
    endpoint: string,
    method: string,
    token?: string,
    body?: Body
}

export const routinesApi = async({endpoint, method, token = '', body}:Props)=>{
    try {
        const resp = await fetch(baseURL + endpoint, {
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