import React from 'react';
import { AuthUserContext } from '../Session';
import Firebase, { withFirebase } from '../Firebase';


interface Props {
    firebase: Firebase,
    listener: any
}

interface State {
    authUser: any,
}

const withAuthentication = (Component: any) => {
    class WithAuthentication extends React.Component<Props, State> {
        listener: any;
        constructor(props: any) {
            super(props)

            this.state = {
                authUser: null
            }
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
            });
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
};

export default withAuthentication