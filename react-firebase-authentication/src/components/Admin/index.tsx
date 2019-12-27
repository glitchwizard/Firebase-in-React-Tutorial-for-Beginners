import React from 'react';

import Firebase, { withFirebase } from '../Firebase';

interface IProps {
    firebase: Firebase
}

interface IState {
    users: any[],
    loading: boolean
}

class AdminPage extends React.Component<IProps, IState> {
    constructor(props:any) {
        super(props)
    
        this.state = {
             loading: false,
             users: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        
        this.props.firebase.users().on('value', (snapshot: any) => {
            const usersObject = snapshot.val();
            debugger;
            if(usersObject!=null){
                const usersList =  Object.keys(usersObject).map( (key: any) => ({
                    ...usersObject[key],
                    uid: key
                }));
    
                this.setState({
                    users: usersList,
                    loading: false,
                });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.users().off();
    }
    
    

    render() {
        const {users, loading} = this.state;

        return (
            <div>
                <h1>Admin</h1>
                {loading && <div> Loading...</div>}

                <UserList users={users} />
            </div>
        ); 
    }
}


const UserList = ({ users }: any) => (
    <ul>
        {users.map( (user: any) => (
            <li key={user.uid}>
                <span>
                    <strong>ID:</strong> {user.uid}
                </span>
                <span>
                    <strong>E-mail:</strong> {user.email}
                </span>
                <span>
                    <strong>Username:</strong> {user.username}
                </span>
            </li>
        ))}
    </ul>
)

export default withFirebase(AdminPage);