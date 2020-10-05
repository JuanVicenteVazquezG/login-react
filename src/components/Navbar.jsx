import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../config/firebase';
import { withRouter } from 'react-router-dom';

const Navbar = (props) => {

    const logout = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="navbar navbar-dark bg-dark" >
            <Link to="/" className="navbar-brand">AUTH</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact>Home</NavLink>
              {
                props.firebaseUser ?
                 ( <NavLink className="btn btn-dark mr-2" to="/admin">Admin</NavLink>)
                 :
                 (null)
              }
               
                {
                    props.firebaseUser !== null ?
                        (<button className="btn btn-dark" onClick={() => { logout() }}>Log out</button>)
                        :
                        (<NavLink className="btn btn-dark mr-2" to="/login" >Login</NavLink>)
                }


            </div>
        </div>
    )
}

export default withRouter(Navbar);
