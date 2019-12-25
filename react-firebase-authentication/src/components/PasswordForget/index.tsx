import React from 'react';
import { Link }  from 'react-router-dom';

import Firebase, { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
    <div>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    error: null
};

interface Props {
    firebase: Firebase
}

interface State {
    email: string,
    error: any
}

class PasswordForgetFormBase extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
    
        this.state = {
             ...INITIAL_STATE
        }
    }

    onSubmit = (event: any) => {
        const { email } = this.state;

        this.props.firebase.doPasswordReset(email)
        .then( () => {
            this.setState({ ...INITIAL_STATE})
        })
        .catch( error => {
            this.setState({ error });
        });
        event.preventDefault();
    };

    onChange = (event: any) => {
        //@ts-ignore
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, error } = this.state;

        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button> 
            </form>
        );
    }    
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Forget Password</Link> 
    </p>
)

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink }