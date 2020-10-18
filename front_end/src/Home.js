import React,{useEffect,useState} from 'react'
import Base from './re_usable/Base'
import { Redirect } from 'react-router-dom'
import {isAuthenticated} from './auth/helper/auth_helper'
import {userAPI} from './helper/home'

export default function Home() {
    
    const [values,setValue] = useState({
        first_name:"",
        last_name:"",
        email:"",
    })

    const {first_name,last_name,email} = values;
    const {user,token} = isAuthenticated();

    const performRedirect=()=>{
        if(!isAuthenticated()){
            return <Redirect to='/signin'/>
        }
    }

    const preLoad =()=>{
        userAPI(token,user.id)
        .then((responce)=>{
            const {first_name,last_name,email} = responce
            setValue({
                ...values,
                first_name,
                last_name,
                email
            });
        }).catch((err)=>{
            console.log('Failed to send API request');
        })
    }

    useEffect(() => {
        preLoad();
    }, [])

    return (
        <Base title=''>
            {performRedirect()}
            <div className="card w-50 mx-auto">
                <div className="card-header text-center">
                    <h2>API</h2>
                </div>
                <div className="card-body text-left">
                    <div className="card-title">
                        <h3>{first_name}</h3>
                    </div>
                    <div className="card-text">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>First Name</th>
                                    <th>: {first_name}</th>
                                </tr>
                                <tr>
                                    <th>Last Name</th>
                                    <th>: {last_name}</th>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <th>: {email}</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Base>
    )
}
