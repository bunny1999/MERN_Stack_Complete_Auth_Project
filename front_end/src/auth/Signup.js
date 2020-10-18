import React, { useState } from 'react'
import Base from '../re_usable/Base'
import {signup} from './helper/auth_helper'
import { Redirect } from 'react-router-dom'

export default function Signup() {
    const [values,setValue] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        error:"",
        isLoading:false,
        didRedirect:false
    })

    const {first_name,last_name,email,password,error,isLoading,didRedirect}=values

    const performRedirect=()=>{
        if(didRedirect){
            return <Redirect to="/signin" />
        }
    }

    const handleChange =(field)=>(event)=>{
        setValue({...values,error:false,[field]:event.target.value})
    }

    const loadingMsg =()=>{
        return (
            isLoading && (
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <div className="alert alert-info text-center">
                            Loading...
                        </div>
                    </div>
                </div>
            )
        )
    }
    const errorMsg = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    style={{display: error ? "" :"none" }}
                    className="alert alert-danger text-center">
                        {JSON.stringify(error)}
                    </div>
                </div>
            </div>
        )
    }

    const signUpForm= ()=>{
        return (
            <div className="row">
                <div className="col-md-6 text-left offset-sm-3">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>First Name</label>
                                <input value={first_name} onChange={handleChange("first_name")} type="text" className="form-control"/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Last Name</label>
                                <input value={last_name} onChange={handleChange("last_name")} type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input value={email} onChange={handleChange("email")} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input value={password} onChange={handleChange("password")} type="password" className="form-control"/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        );
    }

    const onSubmit=(event)=>{
        event.preventDefault()
        setValue({...values,error:false,isLoading:true})
        signup({first_name,last_name,email,password})
        .then((data)=>{
            if(data.err){
                
                setValue({...values,error:data.err,isLoading:false})
            }else{
                setValue({
                    ...values,
                    first_name:"",
                    last_name:"",
                    email:"",
                    password:"",
                    error:"",
                    isLoading:false,
                    didRedirect:true
                })
            }
        }).catch((err)=>{
            console.log('Failed to send Singup Request');
        })
    }

    return (
        <Base title="Sign Up">
            {loadingMsg()}
            {errorMsg()}
            {signUpForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}
