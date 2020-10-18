import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './Home'
import Signin from './auth/Signin'
import Signup from './auth/Signup'
import Forgot_Pass from './auth/Forgot_Pass'

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signup' exact component={Signup}/>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/forgot_pass' exact component={Forgot_Pass}/>
            </Switch>
        </BrowserRouter>
    )
}
