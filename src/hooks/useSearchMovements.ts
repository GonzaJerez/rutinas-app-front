import { useContext, useEffect, useState } from "react"

import { AuthContext } from "../context/auth/AuthContext";
import { Movement, SearchMovementsInDB } from '../interfaces/interfaces';
import { searchInCollectionApi, SearchProps } from "../helpers/searchApi";


export const useSearchMovements = (word:string)=>{

    const [resultsSearchMovements, setResultsSearchMovements] = useState<Movement[]>([])
    const {token} = useContext(AuthContext)

    useEffect(()=>{
        searchInCollection()
    },[word])

    const searchInCollection = async()=>{
        if (!token) return;

        if (word === '') {
            return setResultsSearchMovements([])
        }

        const args:SearchProps = {
            collection: 'Movements',
            token,
            word
        }

        try {
            const {results,msg}:SearchMovementsInDB = await searchInCollectionApi(args)

            // if (msg) {
            //     setError(msg)
            // }
            
            setResultsSearchMovements(results)
            
        } catch (error) {
            
        }
    }

    return {resultsSearchMovements}
}