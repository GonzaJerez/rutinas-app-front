import { useContext, useState } from "react"
import { RoutinesContext } from "../context/routines/RoutinesContext";

export const useDayRoutine = (idRoutine:string) => {
    
    const [creatingDay, setCreatingDay] = useState(false)
    const {createDayRoutine} = useContext(RoutinesContext)

    const [days, setDays] = useState({
        numActualDay: '1',
    })

    const onCreateDay = async()=>{
        setCreatingDay(true)
        // Crea nuevo día
        await createDayRoutine(idRoutine)
        
        setDays({
            ...days,
            // Suma 1 a el número de día actual
            numActualDay: `${Number(days.numActualDay) + 1}`,
        })
        
        setCreatingDay(false)
    }

    const onChangeDay = async(type: 'next'|'prev')=>{
        if (type === 'prev') {
            setDays({
                ...days,
                numActualDay: `${Number(days.numActualDay) - 1}`
            })
        }
        if (type === 'next') {
            setDays({
                ...days,
                numActualDay: `${Number(days.numActualDay) + 1}`
            })
        }
    }

    return {
        onCreateDay,
        onChangeDay,
        days,
        creatingDay
    }

}