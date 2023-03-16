import { useEffect, useState } from "react";

export interface useFetchInfo<T> {
    data?:T;
    loading?:boolean;
    error?:object;
}

export default async function useFetch<useFetchInfo>(url:string){
    const [state, setState] = useState({
        data:undefined,
        loading:false,
        error:undefined,
    });
        setState((prev)=> ({...prev, loading: true}));
        try{
            useEffect( ()=> {
             fetch(url).then(response => setState((prev:any) => ({...prev, data:response, loading: false})))
            },[url])
        }catch(error:any){
            setState((prev) => ({...prev, error }))
        }
        
    return ({...state})
   
}