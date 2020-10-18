import {API} from '../backend'

export const userAPI = (token,id)=>{
    return fetch(`${API}/user/${id}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}