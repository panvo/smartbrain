import React from 'react'

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',

            signInEmailError: '',
            signInPasswordError: '',
            invalidCredentials: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
        this.setState({ signInEmailError: '' })
        this.setState({ invalidCredentials: '' })

    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
        this.setState({ signInPasswordError: '' })
        this.setState({ invalidCredentials: '' })
    }


    onSubmitSignIn = () => {

        // email validation
        if (!this.state.signInEmail.trim()) {
            this.setState({ signInEmailError: 'Email is required' })
        }

        // password validation
        if (!this.state.signInPassword.trim()) {
            this.setState({ signInPasswordError: 'Password is required' })
        }

        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword

            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else if (!user.id && this.state.signInEmail && this.state.signInPassword) {
                    this.setState({ invalidCredentials: 'Invalid credentials' })
                    // document.getElementById('email-address').value = "";
                    // document.getElementById('password').value = "";
                }

            })
    }



    handleKeypress = (event) => {
        //it triggers by pressing the enter key
        if (event.key === "Enter") {
            this.onSubmitSignIn();
        }
    };



    render() {
        const { onRouteChange } = this.props;

        return (
            <div style={{ marginTop: '75px' }}>
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f3 fw6 ph0 mh0">Sign In</legend>


                                {/* EMAIL ADDRESS FIELD */}
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address" style={{ textAlign: 'left' }} >Email</label>
                                    <input
                                        style={{ width: '300px' }}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                                        type="email"
                                        name="email-address"
                                        id="email-address"

                                        onChange={this.onEmailChange}
                                        onKeyPress={this.handleKeypress}
                                    />

                                    {/* EMAIL ADDRESS VALIDATION */}
                                    <p className="db fw6"
                                        style={{ textAlign: 'left', color: 'red', fontSize: '11px', marginTop: '7px' }}>
                                        {this.state.signInEmailError}
                                    </p>
                                </div>


                                {/* PASSWORD FIELD */}
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password" style={{ textAlign: 'left' }} >Password</label>
                                    <input
                                        style={{ width: '300px' }}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                                        type="password"
                                        name="password"
                                        id="password"

                                        onChange={this.onPasswordChange}
                                        onKeyPress={this.handleKeypress}
                                    />

                                    {/* PASSWORD VALIDATION */}
                                    <p className="db fw6"
                                        style={{ textAlign: 'left', color: 'red', fontSize: '11px', marginTop: '7px' }}>
                                        {this.state.signInPasswordError}
                                        {this.state.invalidCredentials}



                                    </p>
                                </div>

                                {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
                            </fieldset>

                            <div>
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in"
                                    onClick={this.onSubmitSignIn} />
                            </div>


                            {/* SIGN IN BUTTON */}
                            <div className="lh-copy mt3">
                                <p
                                    className="f6 black"
                                    style={{ marginTop: '30px' }} >No account yet?</p>

                                <p
                                    onClick={() => onRouteChange('register')}
                                    className="f6 link grow black db pointer"
                                    style={{ color: '#076585' }}>Register</p>

                                {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}

                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}


export default Signin;
