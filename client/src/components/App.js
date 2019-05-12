import React from "react"
import { Provider } from "react-redux"
import store from "../store"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "../styles/main.css"
import { AuthProvider } from "../lib/auth"
import Login from "./auth/Login"
import Register from "./auth/Register"

const App = props => {
    return (
        <AuthProvider>
            <Provider store={store}>
                <Router>
                    <div>
                        {/* public routes */}
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />

                    </div>
                </Router>
            </Provider>
        </AuthProvider>
    )
}

export default App