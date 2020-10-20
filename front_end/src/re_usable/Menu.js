import React from 'react'
import {Link,withRouter} from "react-router-dom"

const currentTab = (history,path)=>{
    if(history.location.pathname===path){
        return {color:"#000000"}
    }else{
        return {color:"#FFFFFF"}
    }
}

const Menu=({history})=>{
    return (
        <div>
            <ul className="nav nav-tabs bg-warning">
                <li className="nav-item">
                    <Link style={currentTab(history,"/")} to="/" className="nav-link ">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signin")} to="/signin" className="nav-link">
                        Sign In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signup")} to="/signup" className="nav-link">
                        Sign Up
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Menu);