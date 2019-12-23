import React from 'react'
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


const SignInPage = () => {
    return (
        <div>
            <h1>SignIn</h1>
            <SignInForm />
            <SignUpLink />
        </div>
    )
};

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
}

interface Props {
    firebase: Firebase,
    history: any
}
interface State {
    email: string,
    password: string,
    error: any
}

class SignInFormBase extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        
        this.state = { ...INITIAL_STATE};
    }    

    onSubmit = (event: any) => {
        const {email, password} = this.state;

        this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({ ...INITIAL_STATE});
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error })
        });
        event.preventDefault();
    };

    onChange = (event: any ) => {
        //@ts-ignore
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;

        const isInvalid: boolean = password.length < 4 || email.length < 4;  

        return (
            <form onSubmit={this.onSubmit}> 
                <input
                 name="email"
                 value={email}
                 onChange={this.onChange}
                 type="text" 
                 placeholder="Email Address"
                />
                <input 
                 name="password"
                 value={password}
                 onChange={this.onChange}
                 type="password"
                 placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };