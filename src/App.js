import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './static/App.css';
import Hero from './screens/Hero'
import Register from './screens/Sign-up'
import Login from './screens/Sign-in'
import Profile from './screens/Profile';
import db from './config/db'
import User from './screens/User';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false)

  const listenUser = () => {
    const usersRef = db.database();
    db.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .ref(`u/${user.uid}`)
          .once('value', () => {
            setAuthenticated(true)
          })
          .catch(() => {
            setAuthenticated(false)
          });
      } else {
        setAuthenticated(false)
      }
    });
  }
  useEffect(() => {
    listenUser()
  }, [authenticated])

  return (
    <Router>
      {authenticated ? <Redirect to='/user' /> : <Redirect to='/' />}
      <Switch>
        {
          authenticated ?
            <>
              <Route path="/user" component={User} exact></Route>
              <Route path="/profile" component={Profile} exact></Route>
            </>
            :
            <>
              <Route path="/" component={Hero} exact></Route>
              <Route path="/register" component={Register} exact></Route>
              <Route path="/login" component={Login} exact></Route>
            </>
        }
      </Switch>
    </Router>
  );
}

export default App;