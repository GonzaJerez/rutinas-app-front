import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import { searchInCollectionApi, SearchProps } from "../helpers/searchApi";
import { Movement, SearchInDB, User } from "../interfaces/interfaces";


export const useSearch = (collection: 'Users'|'Movements', word:string)=>{

    const {token} = useContext(AuthContext)

    const [resultSearch, setSearch] = useState<User[] | Movement[]>([])
    const [error, setError] = useState<string>()

    useEffect(()=>{
        searchInCollection()
    },[word])

    const searchInCollection = async()=>{
        if (!token) return;

        if (word === '') {
            return setSearch([])
        }

        const args:SearchProps = {
            collection,
            token,
            word
        }

        try {
            const {results,msg}:SearchInDB = await searchInCollectionApi(args)

            if (msg) {
                setError(msg)
            }
            
            setSearch(results)
            
        } catch (error) {
            
        }
    }

    return {resultSearch}
}