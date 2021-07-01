import React from 'react'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',

            nameError: '',
            emailError: '',
            passwordError: '',
            password2Error: '',
            all: ''

        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
        this.setState({ nameError: '' })
        this.setState({ all: '' })
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value })
        this.setState({ emailError: '' })
        this.setState({ all: '' })

    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
        this.setState({ passwordError: '' })
        this.setState({ all: '' })
    }

    onConfirmPasswordChange = (event) => {
        this.setState({ password2: event.target.value })
        this.setState({ password2Error: '' })
        this.setState({ all: '' })
    }


    onSubmitSignIn = () => {

        // name validation
        if (!this.state.name.trim()) {
            this.setState({ nameError: 'Name is required' })
        }

        // email validation
        if (!this.state.email) {
            this.setState({ emailError: 'Email is required' })
        }
        else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            this.setState({ emailError: 'Email address is invalid' });
        }

        // password validation
        if (!this.state.password) {
            this.setState({ passwordError: 'Password is required' });
        }
        else if (this.state.password.length < 8) {
            this.setState({ passwordError: 'Password needs to be 8 characters or more' });
        }

        // confirm password validation
        if (this.state.password) {
            if (this.state.password2) {
                if (this.state.password2 !== this.state.password) {
                    this.setState({ password2Error: 'Passwords do not match' });
                }
            }
        }

        // EMPTY REGISTER FORM VALIDATION
        if (
            !this.state.name &&
            !this.state.email &&
            !this.state.password &&
            !this.state.password2) {
            this.setState({ all: 'Please populate all fields' });
        }

        if (
            this.state.name &&
            this.state.email &&
            this.state.password &&
            /\S+@\S+\.\S+/.test(this.state.email) &&
            this.state.password.length >= 8 &&
            this.state.password2 === this.state.password
        ) {

            fetch('http://localhost:3000/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })

                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user)
                        this.props.onRouteChange('home')
                    }
                })
        }
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
                                <legend className="f3 fw6 ph0 mh0">Register</legend>


                                {/* NAME FIELD */}
                                <div className="mt3">
                                    <label
                                        style={{ textAlign: 'left' }}
                                        className="db fw6 lh-copy f6"
                                        htmlFor="name"
                                    >Name</label>

                                    <input
                                        style={{ width: '300px' }}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                                        type="text"
                                        name="name"
                                        id="name"

                                        onChange={this.onNameChange}
                                        onKeyPress={this.handleKeypress}
                                        autoComplete="off"
                                    />

                                    {/* NAME VALIDATION */}
                                    <p className="db fw6"
                                        style={{ textAlign: 'left', color: 'red', fontSize: '11px', marginTop: '7px' }}>
                                        {this.state.nameError}
                                    </p>
                                </div>


                                {/* EMAIL FIELD */}
                                <div className="mt3">
                                    <label
                                        style={{ textAlign: 'left' }}
                                        className="db fw6 lh-copy f6"
                                        htmlFor="email-address"
                                    >Email</label>
                                    <input
                                        style={{ width: '300px' }}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                                        type="email"
                                        name="email-address"
                                        id="email-address"

                                        onChange={this.onEmailChange}
                                        onKeyPress={this.handleKeypress}
                                        autoComplete="off"
                                    />

                                    {/* EMAIL VALIDATION */}
                                    <p className="db fw6"
                                        style={{ textAlign: 'left', color: 'red', fontSize: '11px', marginTop: '7px' }}>
                                        {this.state.emailError}
                                    </p>
                                </div>



                                {/* PASSWORD FIELD */}
                                <div className="mv3">
                                    <label
                                        style={{ textAlign: 'left' }}
                                        className="db fw6 lh-copy f6"
                                        htmlFor="password"
                                    >Password</label>
                                    <input
                                        style={{ width: '300px' }}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                                        type="password"
                                        name="password"
                                        id="password"

                                        onChange={this.onPasswordChange}
                                        onKeyPress={this.handleKeypress}
                                        autoComplete="off"
                                    />

                                    {/* PASSWORD VALIDATION */}
                                    <p className="db fw6"
                                        style={{ textAlign: 'left', color: 'red', fontSize: '11px', marginTop: '7px' }}>
                                        {this.state.passwordError}
                                    </p>
                                </div>


                                {/* PASSWORD CONFIRMATION FIELD */}
                                <div className="mv3">
                                    <label
                                        style={{ textAlign: 'left' }}
                                        className="db fw6 lh-copy f6"
                                        htmlFor="password"
                                    >Comfirm Password</label>
                                    <input
                                        style={{ width: '300px' }}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                                        type="password"
                                        name="password2"
                                        id="password2"

                                        onChange={this.onConfirmPasswordChange}
                                        onKeyPress={this.handleKeypress}
                                        autoComplete="off"
                                    />

                                    {/* PASSWORD VALIDATION */}
                                    <p className="db fw6"
                                        style={{ textAlign: 'left', color: 'red', fontSize: '11px', marginTop: '7px' }}>
                                        {this.state.password2Error}
                                        {this.state.all}

                                    </p>
                                </div>



                                {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label> */}
                            </fieldset>



                            {/* REGISTER BUTTON */}
                            <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Register"
                                    onClick={this.onSubmitSignIn}
                                />
                            </div>



                            {/* LINK TO SIGN IN */}
                            <div className="lh-copy mt3">
                                <p
                                    className="f6 black"
                                    style={{ marginTop: '30px' }}>Already have an account? </p>

                                <p
                                    onClick={() => onRouteChange('signin')}
                                    className="f6 link grow black db pointer"
                                    style={{ color: '#076585', }}>Sign In </p>
                            </div>


                        </div>
                    </main>
                </article>
            </div>
        );
    }

}


export default Register;
