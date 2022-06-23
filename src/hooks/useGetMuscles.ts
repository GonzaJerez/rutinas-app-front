import { useState,useEffect } from "react"
import { routinesApi } from "../api/routinesApi"
import { Muscle, GetMuscles } from '../interfaces/interfaces';


export const useGetMuscles = ()=>{
    const [muscles, setMuscles] = useState<Muscle[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        getMuscles()
    },[])

    const getMuscles = async()=>{
        setIsLoading(true)
        try {
            const resp:GetMuscles = await routinesApi({
                endpoint:'/muscles',
                method:'GET'
            })
    
            setMuscles(resp.muscles)
            setIsLoading(false)
        
        } catch (error) {
            console.log(error);
        }
        
    }

    return {
        muscles,
        isLoading
    }
}