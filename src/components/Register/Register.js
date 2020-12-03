import React from 'react';
import '../SignIn/Signin.css' 
import {REGISTER_URL, PROFILE_URL} from "../Constans/Fetch";

class Register extends React.Component {

    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token',token);
    }

    onSubmitSignIn = () => {

        if(!this.state.email || !this.state.password || !this.state.name){
        if (this.state.name === '') {
            document.getElementById('nameInput').innerHTML = 'Please enter your name';
        
        }
         if(this.state.password.length < 5){
            document.getElementById('passwordInput').innerHTML = 'Your password need conatin at least 6 characters';
        }
        if(this.state.email === ''){
            document.getElementById('emailInput').innerHTML = 'Please enter your email address';
        }
     } else {
            fetch(REGISTER_URL, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            })
                .then(response => {
                        if (response.status === 400){
        document.getElementById('emailInput').innerHTML = '';
        document.getElementById('passwordInput').innerHTML = 'This email exsits ';
        document.getElementById('nameInput').innerHTML = '';
    }
                  return response.json()
                })
                .then(data => {
                    
                    if (data.userId && data.success === 'true' )  {
                        this.saveAuthTokenInSession(data.token)

                        fetch(PROFILE_URL + data.userId, {
                            method: 'get',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': data.token
                            }
                          })
                          .then(res => res.json())
                          .then(user => {
                            if(user){
                              this.props.loadUser(user)
                              this.props.onRouteChange('home')
                            }
                          })
                      .catch(console.log)

                    }
                })
        }
    }
       
    render() {


        const mystyle = {
            color: "red",
            fontSize: "12px"
          };

        return (
            <div className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">

                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input
                                    onChange={this.onNameChange}
                                    className="pa2 input-classNamereset ba bg-transparent hover-bg-black hover-white w-100 hover-black" type="name" name="name" id="email-address" />
                                <p style={mystyle} id='nameInput'></p>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-classNamereset ba bg-transparent hover-bg-black hover-white w-100 hover-black" type="email" name="email-address" id="email-address" />
                                <p style={mystyle} id='emailInput'></p>

                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" type="password" name="password" id="password" />
                                <p style={mystyle} id='passwordInput'></p>

                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register" />
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default Register;