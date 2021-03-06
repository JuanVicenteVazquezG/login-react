import React from 'react';
import { auth } from '../config/firebase';
import { withRouter } from 'react-router';
import Firestore from './Firestore.jsx';

const Admin = (props) => {

    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        if (auth.currentUser) {
                        setUser(auth.currentUser);
        } else {
            
            props.history.push('/login');
        }
    }, [props.history]);

    return (
        <div>{
           user ? (<>
           <h2>Protected Route, but you can pass</h2>
           {
               user && (<Firestore user={user}/>)
           }
           </>) 
           :
            (<h2>You can't Pass !!!</h2>)
 }
        </div>
    )
}

export default withRouter(Admin);
