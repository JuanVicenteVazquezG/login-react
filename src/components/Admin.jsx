import React from 'react';
import { auth } from '../config/firebase';
import { withRouter } from 'react-router';

const Admin = (props) => {

    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        if (auth.currentUser) {
            console.log('A user Exist!');
            setUser(auth.currentUser);
        } else {
            console.log(`This user Doesn't exist!`);
            props.history.push('/login');
        }
    }, [props.history]);

    return (
        <div>{
           user ? (<>
           <h2>Protected Route, but you can pass</h2>
           {
               user && (<h3>{user.email}</h3>)
           }
           </>) 
           :
            (<h2>You can't Pass !!!</h2>)
 }
        </div>
    )
}

export default withRouter(Admin);