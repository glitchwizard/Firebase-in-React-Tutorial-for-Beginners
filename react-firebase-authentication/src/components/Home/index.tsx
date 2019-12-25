import React from 'react';
import { withAuthorization } from '../Session';

const HomePage = () => {
    return (
        <div>
            <h1>HomePage</h1>
            <p>HomePage page is accessible by every singed in user.</p>
        </div>
    )
}

const condition = (authUser: any) => !!authUser;

export default withAuthorization(condition)(HomePage);