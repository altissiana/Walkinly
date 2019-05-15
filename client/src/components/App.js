import React from "react"
import { Provider } from "react-redux"
import store from "../store"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "../styles/main.css"
import { AuthProvider } from "../lib/auth"
import Login from "./auth/Login"
import Register from "./auth/Register"

import SMSForm from './SMSForm';

const App = props => {
    return (
        <div className="App">
            <header className="App-header">

            <SMSForm />
            </header>
        </div>
        );
}

export default App