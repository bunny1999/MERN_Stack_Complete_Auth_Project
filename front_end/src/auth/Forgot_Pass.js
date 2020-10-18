import React, { useState } from 'react'
import Base from '../re_usable/Base'
import { Redirect } from 'react-router-dom'
import {fogortpass,veifyotp,changepass} from './helper/auth_helper'

export default function Forgot_Pass() {
    const [values,setValue] = useState({
        email:"",
        otp:"",
        newpass:"",
        error:"",
        success:false,
        otpSend:false,
        otpVerified:false,
        isLoading:false,
        didRedirect:false,
    })

    const {email,otp,newpass,success,error,otpSend,otpVerified,isLoading,didRedirect}=values

    const handleChange =(field)=>(event)=>{
        setValue({...values,success:false,error:false,[field]:event.target.value})
    }

    const performRedirect = ()=>{
        if(didRedirect){
            return <Redirect to="/signin" />
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

    const successMsg =()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    style={{display: success ? "" :"none" }}
                    className="alert alert-success text-center">
                        {JSON.stringify(success)}
                    </div>
                </div>
            </div>
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

    const sendOTPForm= ()=>{
        return (
            <div className="row">
                <div className="col-md-6 text-left offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input value={email} onChange={handleChange("email")} type="email" className="form-control"/>
                        </div>
                        <button onClick={onSubmitEmail} className="btn btn-success btn-block">Send OTP</button>
                    </form>
                </div>
            </div>
        );
    }

    const otpVerifyForm= ()=>{
        return (
            <div className="row">
                <div className="col-md-6 text-left offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label>OTP</label>
                            <input value={otp} onChange={handleChange("otp")} type="text" className="form-control"/>
                        </div>
                        <button onClick={onSubmitOTP} className="btn btn-success btn-block mb-2">Verify OTP</button>
                        <button onClick={onResendOTP} className="btn btn-primary btn-block">Resend OTP</button>
                    </form>
                </div>
            </div>
        );
    }

    const changePassForm= ()=>{
        return (
            <div className="row">
                <div className="col-md-6 text-left offset-sm-3">
                    <form>
                        <div className="form-group">
                            <label>New Password</label>
                            <input value={newpass} onChange={handleChange("newpass")} type="password" className="form-control"/>
                        </div>
                        <button onClick={onPassChange} className="btn btn-success btn-block">Change Password</button>
                    </form>
                </div>
            </div>
        );
    }

    const onSubmitEmail=(event)=>{
        event.preventDefault()
        setValue({...values,error:false,isLoading:true})
        fogortpass({email})
        .then((responce)=>{
            if(responce.err){
                setValue({...values,error:responce.err,success:false,isLoading:false})
            }else{
                setValue({
                    ...values,
                    error:false,
                    success:"OTP Send To Your Email!",
                    otpSend:true,
                    isLoading:false
                });
            }
        }).catch((err)=>{
            console.log('Failed to send forget reuest');
        })
    }

    const onSubmitOTP=(event)=>{
        event.preventDefault()
        setValue({...values,error:false,success:false,isLoading:true})
        veifyotp({email,otp})
        .then((responce)=>{
            if(responce.err){
                setValue({...values,error:responce.err,isLoading:false})
            }else{
                setValue({
                    ...values,
                    error:"",
                    success:"OTP Varified!",
                    isLoading:false,
                    otpVerified:true
                })
            }
        })
        .catch((err)=>{
            console.log('Faild to send otp verify request');
        })
    }

    const onResendOTP=(event)=>{
        event.preventDefault()
        setValue({...values,
            email:"",
            otp:"",
            error:false,
            success:false,
            isLoading:false,
            otpSend:false,
            otpVerified:false
        })
    }

    const onPassChange=(event)=>{
        event.preventDefault()
        setValue({...values,error:false,success:false,isLoading:true})
        changepass({email,newpass},otp)
        .then((responce)=>{
            if(responce.err){
                setValue({...values,error:responce.err,isLoading:false})
            }else{
                setValue({
                    ...values,
                    success:"Your Password Change Successfully",
                    email:"",
                    otp:"",
                    newpass:"",
                    error:false,
                    isLoading:false,
                    otpSend:false,
                    didRedirect:true
                })
            }
        }).catch((err)=>{
            console.log('Failed to send password change request!');
        })
    }

    return !otpVerified
    ?!otpSend
        ?(
            <Base title="Forgot Password">
                {loadingMsg()}
                {successMsg()}
                {errorMsg()}
                {sendOTPForm()}
            </Base>
        )
        :(
            <Base title="Forgot Password">
                {loadingMsg()}    
                {successMsg()}
                {errorMsg()}
                {otpVerifyForm()}
            </Base>
        )
    :(
        <Base title="Forgot Password">
            {loadingMsg()}    
            {successMsg()}
            {errorMsg()}
            {changePassForm()}
            {performRedirect()}
        </Base>
    )
}
