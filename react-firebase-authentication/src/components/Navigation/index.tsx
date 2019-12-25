import React from 'react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser != null ? <NavigationAuth /> : <NavigationNonAuth /> }
        </AuthUserContext.Consumer>
        <h1>Navigation</h1>
    </div>
);

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link to={ROUTES.HOME}>Home (logged in only)</Link>
        </li>
            <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
        <li>
            <SignOutButton />
        </li>

    </ul>
);

const NavigationNonAuth = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;