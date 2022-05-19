import { useContext, useEffect, useState } from "react";

import { routinesApi } from '../api/routinesApi';
import { AuthContext } from "../context/auth/AuthContext";
import { ImgsRoutines } from "../interfaces/interfaces";


export const useImagesRoutines = () =>{

    const [imgsRoutines, setImgsRoutines] = useState<string[]>([])

    const {token} = useContext(AuthContext)
    
    useEffect(()=>{
        getImagesRoutines()
    },[])

    const getImagesRoutines = async() => {
        if (!token) return;
        const {imagesList}:ImgsRoutines = await routinesApi({
            endpoint: '/routinesImages',
            method: 'GET',
            token
        })

        setImgsRoutines(imagesList)
    }

    return {imgsRoutines}
}