
import { Set } from "../interfaces/interfaces"


export const calculate1RM = (sets:Set[]):string => {
    const weight = Math.max(...sets.map( set => Number(set.weight)))
    const numReps = Number(sets.find( set => Number(set.weight) === weight )?.numReps)

    return (weight / (1.0278 - 0.0278 * numReps)).toFixed(2)
}