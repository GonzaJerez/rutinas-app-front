import { routinesApi } from "../api/routinesApi";

export interface SearchProps {
    collection: 'Users'|'Movements';
    word:        string;
    token:       string;
}

export const searchInCollectionApi = async({collection,word,token}:SearchProps) => {
    const resp = await routinesApi({
        endpoint: `/search/${collection}/${word}`,
        method: 'GET',
        token
    })

    return resp;
}