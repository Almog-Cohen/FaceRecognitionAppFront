import React from 'react';
import './Signin.css' 
import {SIGN_IN_URL, PROFILE_URL} from "../Constans/Fetch";
class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }



    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    saveAuthTokenInSession = (token) => {
        window.sessionStorage.setItem('token',token);
    }

    onSubmitSignIn = () => {

        fetch(SIGN_IN_URL,{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json())
        .then (data => {
            if(data.success === 'true' && data.userId){
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
        
     

  

    render() {
        const { onRouteChange } = this.props;
        const mystyle = {
            color: "red",
            fontSize: "12px"
          };
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw7 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-classNamereset ba bg-transparent hover-bg-black hover-white w-100 hover-black" type="email" name="email-address" id="email-address" />
                                <p style={mystyle} id='emailSignInInput'></p>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black" type="password" name="password" id="password" />
                                <p style={mystyle} id='passwordSignInInput'></p>

                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;