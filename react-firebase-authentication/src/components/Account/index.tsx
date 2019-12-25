import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import PasswordForgetForm from '../PasswordForget';

const Account = () => {
    return (
        <div>
            <h1>Account</h1>
            <PasswordForgetForm />
            <PasswordChangeForm /> 
        </div>
    )
}

export default Account;