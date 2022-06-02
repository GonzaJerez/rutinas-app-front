import { useContext, useEffect, useRef, useState } from "react"
import { CombinedWorkout, Day, WorkoutInRoutine } from '../interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';
import { RoutinesContext } from "../context/routines/RoutinesContext";
import { Animated } from "react-native";


export const useTraining = (workouts:CombinedWorkout[], idDay:string)=>{

    
    const {goBack} = useNavigation<any>()
    const [shadow, setShadow] = useState(true)
    const [onBreak, setOnBreak] = useState(false)
    const opacity = useRef(new Animated.Value(1)).current;
    const {updateCombinedWorkouts} = useContext(RoutinesContext)

    const [indexActualCombinedWorkout, setNumActualCombinedWorkout] = useState(0)
    const [numActualSet, setNumActualSet] = useState(1)
    const [numTotalSets, setNumTotalSets] = useState(workouts[indexActualCombinedWorkout]?.combinedWorkouts[0].sets.length)
    const [combinedWorkoutState, setCombinedWorkoutState] = useState(workouts[indexActualCombinedWorkout])

    useEffect(()=>{
        setNumTotalSets(workouts[indexActualCombinedWorkout]?.combinedWorkouts[0]?.sets.length)
    },[indexActualCombinedWorkout])

    const nextWorkouts = ()=>{
        if (numActualSet === numTotalSets) {
            setNumActualCombinedWorkout(prev => prev + 1)
            setNumActualSet(1)
        } else {
            setNumActualSet(prev => prev + 1)
        }
    }

    const viewNextWorkouts = ()=>{
        let nextWorkout:WorkoutInRoutine[]

        if (numActualSet === numTotalSets) {
            if (workouts[indexActualCombinedWorkout + 1]) {
                nextWorkout = workouts[indexActualCombinedWorkout + 1]?.combinedWorkouts
            } else {
                nextWorkout = [];
            }
        } else {
            nextWorkout = workouts[indexActualCombinedWorkout]?.combinedWorkouts
        }
        return nextWorkout
    }

    const onChangeWeight = (idWorkoutInRoutine:string, weight:number) => {
        setCombinedWorkoutState({
            ...combinedWorkoutState,
            combinedWorkouts: combinedWorkoutState.combinedWorkouts.map( workout => workout._id.toString() !== idWorkoutInRoutine 
                ? workout
                : {
                    ...workout,
                    sets: workout.sets.map( (set, index) => index !== numActualSet - 1 
                        ? set
                        : {
                            ...set,
                            weight: weight.toString()
                        }
                    )
                }
            )
        })
    }

    const onFinishTraining = ()=>{
        updateCombinedWorkouts(idDay, workouts[indexActualCombinedWorkout]._id || '', combinedWorkoutState)
        goBack();
    }

    const changeStatusBreak = ({back}:{back?:boolean})=>{
        setShadow(false)
        Animated.timing(
            opacity, {
                toValue:0,
                useNativeDriver: false,
                duration: 500
            }
        ).start( ()=>{

            setOnBreak(!onBreak);
            if (onBreak && !back) {
                updateCombinedWorkouts(idDay, workouts[indexActualCombinedWorkout]._id || '', combinedWorkoutState)
                nextWorkouts()
            }
            Animated.timing(
                opacity, {
                    toValue:1,
                    useNativeDriver: false,
                    duration: 500
                }
            ).start(()=>{
                setShadow(true)
            })
        })
    }

    return {
        // trainingState
        indexActualCombinedWorkout,
        numActualSet,
        numTotalSets,
        opacity,
        shadow,
        onBreak,
        changeStatusBreak,
        onChangeWeight,
        viewNextWorkouts,
        onFinishTraining
    }
}