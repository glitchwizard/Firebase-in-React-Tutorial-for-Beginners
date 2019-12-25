import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => {
    return (
        <AuthUserContext.Consumer>
            {(authUser: any) => (
                <div>
                    <h1>Account: {authUser.email}</h1>
                    <PasswordForgetForm />
                    <PasswordChangeForm /> 
                </div>
            )}
        </AuthUserContext.Consumer>
    )
}

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(AccountPage);