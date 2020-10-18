import {API} from '../../backend'

export const signup = (user)=>{
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

export const singin = (user)=>{
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

export const fogortpass = (data)=>{
    return fetch(`${API}/forgot_pass`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

export const veifyotp = (data)=>{
    return fetch(`${API}/verify_otp`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

export const changepass=(data,otp)=>{
    return fetch(`${API}/change_pass/${otp}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then((responce)=>{
        return responce.json()
    }).catch((err)=>{
        console.log(err);
    })
}

export const authenticate = (data,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = ()=>{
    if(typeof window=="undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}