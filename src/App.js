import Header from './components/Header';
import SignupForm from './Pages/SignupForm';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import User from './Pages/User';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import AuthContext from "../src/Auth/authContext"

function App() {

  const authCtx = React.useContext(AuthContext);
  
  return (
    <div>
      <Header />
      <div className='main_body'>
        <Switch>
          <Route path="/sign-up">
            <SignupForm />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          {authCtx.isLoggedIn &&
          <Route path="/home">
            <HomePage />
          </Route>}
          {authCtx.isLoggedIn &&
          <Route path="/user">
            <User />
          </Route>}
        </Switch>
      </div>
    </div>
  );
}

export default App;
