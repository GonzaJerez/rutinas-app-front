import { useState,useEffect } from "react"
import { routinesApi } from "../api/routinesApi"
import { Muscle, GetMuscles } from '../interfaces/interfaces';


export const useGetMuscles = ()=>{
    const [muscles, setMuscles] = useState<Muscle[]>([])

    useEffect(()=>{
        getMuscles()
    },[])

    const getMuscles = async()=>{
        try {
            const resp:GetMuscles = await routinesApi({
                endpoint:'/muscles',
                method:'GET'
            })
    
            setMuscles(resp.muscles)
        
        } catch (error) {
            console.log(error);
        }
        
    }

    return {muscles}
}