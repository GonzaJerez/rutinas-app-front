import { useContext, useEffect, useState } from "react";
import { RoutinesContext } from "../context/routines/RoutinesContext";

export const useTimer = (setIsTimerFinished:React.Dispatch<React.SetStateAction<boolean>>)=>{

    const {actualRoutine} = useContext(RoutinesContext)
    const [prevTime, setPrevTime] = useState<number | null>(null);
    const [timeInMilliseconds, setTimeInMilliseconds] = useState(actualRoutine?.timer || 60000);
    const [isPaused, setIsPaused] = useState(false)
    const [time, setTime] = useState({
        seconds: 0,
        minutes: 0,
        milliseconds: 0
    });

    // Extrae del total de milisegundos cada uno de los elementos del temporizador
    const toTime = (time:number) => {
        let milliseconds = Math.floor((time % 1000) / 100),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor(time / (1000 * 60));
    
        return {
          milliseconds,
          seconds,
          minutes
        };
    };

    let timerInterval:NodeJS.Timer

    // Intervalo
    useEffect(() => {
        if(isPaused) return;

        timerInterval = setInterval(() => {
            let prev = prevTime ? prevTime : Date.now();
            let diffTime = Date.now() - prev;
            let newMilliTime = timeInMilliseconds - diffTime;
            if(newMilliTime <= 0) return onFinish();
            let newTime = toTime(newMilliTime);
            setPrevTime(Date.now());
            setTimeInMilliseconds(newMilliTime);
            setTime(newTime);
        }, 100);

        return () => clearInterval(timerInterval);
        
    }, [timeInMilliseconds, isPaused, prevTime]);


    const onPause = ()=>{
        setIsPaused(true)
        setPrevTime(null)
    }

    const onPlay = ()=>{
        setIsPaused(false)
    }

    const onRestart = ()=>{
        setTimeInMilliseconds(new Date(actualRoutine?.timer || 60000).getTime())
        setTime(toTime(new Date(actualRoutine?.timer || 60000).getTime()))
    }

    const onFinish = ()=>{
        setIsTimerFinished(true)
        clearInterval(timerInterval)
        setTime({
            milliseconds:0,
            minutes:0,
            seconds:0
        })
    }

    return {
        time,
        isPaused,
        onPause,
        onPlay,
        onRestart
    }
}