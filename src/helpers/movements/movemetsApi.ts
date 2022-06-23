import { routinesApi } from '../../api/routinesApi';

export interface GetMovementsProps {
    token:  string;
    page:   number;
    limit:  number;
}


export const getMovementsApi = ({limit,page,token}:GetMovementsProps)=>{
    const resp = routinesApi({
        endpoint:`/movements?page=${page}&limit=${limit}`,
        method: 'GET',
        token
    })

    return resp;
}