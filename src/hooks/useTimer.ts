import { useContext, useEffect, useState } from "react";
import { RoutinesContext } from "../context/routines/RoutinesContext";

export const useTimer = (setIsTimerFinished:React.Dispatch<React.SetStateAction<boolean>>)=>{

    const {actualRoutine} = useContext(RoutinesContext)
    const time = new Date(actualRoutine?.timer || 60000)
    const [minutes, setMinutes] = useState(time.getMinutes())
    const [seconds, setSeconds] = useState(time.getSeconds())
    const [miliseconds, setMiliseconds] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    let timerInterval:NodeJS.Timer

    useEffect(()=>{
        if(isPaused) return;
        timerInterval = setInterval(()=>{
            if (miliseconds !== 0) {
                // return setTimer({...miliseconds: miliseconds-1})
                return setMiliseconds(miliseconds - 1)
            }
            if (miliseconds === 0 && seconds === 0 && minutes === 0) {
                clearInterval(timerInterval)
                setIsTimerFinished(true)
            }
            if (miliseconds === 0 && seconds !== 0) {
                setMiliseconds(9);
                setSeconds(seconds -1)
            }
            if (miliseconds === 0 && seconds === 0 && minutes !== 0) {
                setMiliseconds(9);
                setSeconds(59);
                setMinutes( minutes - 1)
            }
        },70)
        return ()=>{
            clearInterval(timerInterval)
        }
    },[miliseconds, isPaused])

    const onPause = ()=>{
        clearInterval(timerInterval)
        setIsPaused(true)
    }

    const onPlay = ()=>{
        setIsPaused(false)
    }

    const onRestart = ()=>{
        setMiliseconds(0),
        setSeconds(time.getSeconds())
        setMinutes(time.getMinutes())
    }

    return {
        isPaused,
        miliseconds,
        seconds,
        minutes,
        onPause,
        onPlay,
        onRestart
    }
}