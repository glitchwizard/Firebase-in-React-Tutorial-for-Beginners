import React from 'react'
import Firebase, { withFirebase } from '../Firebase';

const SignOutButton = ({firebase}: any) => (
    <button type="button" onClick={firebase.doSignOut}>
        Sign Out
    </button>
)

export default withFirebase(SignOutButton);