import React from 'react'
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import Firebase, { withFirebase } from '../Firebase';
import { Link, withRouter } from 'react-router-dom';


const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
)

interface Props {
    firebase: Firebase,
    history: any,
}

interface State {
    username: string,
    email: string,
    passwordOne: string,
    passwordTwo: string,
    error: any
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class SignUpFormBase extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = { ...INITIAL_STATE}
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = (event: any) => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then((authUser: any) => {
            return this.props.firebase
            .user(authUser.user.uid)
            .set({
                username,
                email
            });
        })
        .then(() => {
            this.setState({ ...INITIAL_STATE});
            this.props.history.push(ROUTES.HOME);
        })
        .catch((error: any) => {
            this.setState({ error });
        });
        event.preventDefault();
    }

    onChange = (event: any) => { 
        //@ts-ignore
        this.setState({ [event.target.name]: event.target.value });
    };
    
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid = 
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email.length < 4 ||
        username.length < 4; 

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase
    )
    (SignUpFormBase);


export default SignUpPage;

export { SignUpFormBase, SignUpLink};
