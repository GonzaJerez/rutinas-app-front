import { useEffect, useState } from "react"
import { routinesApi } from "../api/routinesApi"
import { GetWorkouts, Workout } from '../interfaces/interfaces';


export const useGetWorkouts = (muscleId:string)=>{
    const [workouts, setWorkouts] = useState<Workout[]>()

    useEffect(()=>{
        getWorkouts()
    },[])

    const getWorkouts = async()=>{
        try{
            const {workouts}:GetWorkouts = await routinesApi({
                endpoint: `/workouts?muscleId=${muscleId}`,
                method: 'GET'
            })
            setWorkouts(workouts)
            
        } catch(err){
            console.log(err);
        }
    }

    return {workouts}
}