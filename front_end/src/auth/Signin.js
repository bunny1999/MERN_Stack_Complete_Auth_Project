import React, { useState } from 'react'
import Base from '../re_usable/Base'
import { Redirect } from 'react-router-dom'
import {singin,authenticate} from './helper/auth_helper'

export default function Signin() {
    
    const [values,setValue] = useState({
        email:"",
        password:"",
        error:"",
        isLoading:false,
        didRedirect:false,
        forgotPass:false,
    })

    const {email,password,error,forgotPass,isLoading,didRedirect}=values

    const handleChange =(field)=>(event)=>{
        setValue({...values,error:false,[field]:event.target.value})
    }

    const performRedirect = ()=>{
        if(didRedirect){
            return <Redirect to="/" />
        }
        if(forgotPass){
            return <Redirect to="/forgot_pass" />
        }
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

    const signInForm= ()=>{
        return (
            <div className="row">
                <div className="col-md-6 text-left offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input value={email} onChange={handleChange("email")} type="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input value={password} onChange={handleChange("password")} type="password" className="form-control"/>
                        </div>
                        <button onClick={onForgot} className="btn btn-primary btn-sm mb-2">Forgot Password</button>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Sign In</button>
                    </form>
                </div>
            </div>
        );
    }

    const onSubmit=(event)=>{
        event.preventDefault()
        setValue({...values,error:false,isLoading:true})
        singin({email,password})
        .then((responce)=>{
            if(responce.err){
                setValue({...values,error:responce.err,isLoading:false})
            }else{
                authenticate(responce,()=>
                    setValue({
                        ...values,
                        email:"",
                        password:"",
                        isLoading:false,
                        didRedirect:true
                    })   
                )
            }
        }).catch((err)=>{
            console.log('Failed to send Singin Request!')
        });
    }

    const onForgot=(event)=>{
        event.preventDefault()
        setValue({...values,forgotPass:true});
    }

    return (
        <Base title="Sign In">
            {loadingMsg()}
            {errorMsg()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}
