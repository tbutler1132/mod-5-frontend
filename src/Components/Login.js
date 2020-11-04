import React, { Component } from 'react'
import { withRouter, redirect } from 'react-router-dom'


class Login extends Component{
    state = {
        name: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitHandler(this.state)
    }
    
    render(){

        return (

            <div className="login-form">
                {/* <h1>Welcome to Triva!</h1> */}
                <form onSubmit={this.submitHandler}>
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.changeHandler}/>
                        <input type='password' name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
        
                        <button variant="dark" id="login-submit" type="submit" value="Login">Login</button>
                </form>
            </div>
        )
    }
}

export default Login