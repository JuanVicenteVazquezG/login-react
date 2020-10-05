import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import Admin from './components/Admin';
import Login from './components/Login';
import Navbar from './components/Navbar';

import { auth } from './config/firebase';


function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(()=>{
    auth.onAuthStateChanged(user =>{
      console.log(user);
      if (user){
        setFirebaseUser(user);
      }else {
        setFirebaseUser(null);
      }
    });
  },[]);

  return  firebaseUser !== false ? (
    <Router>
      <div className="container">
      <Navbar firebaseUser={firebaseUser}/>
      <Switch>
          <Route path="/" exact>Home</Route>
          <Route path="/login"><Login/></Route>
          <Route path="/admin"><Admin/></Route>

        </Switch>
      </div>
    </Router>
  ) : (<p>Loading...</p>)
}

export default App;
