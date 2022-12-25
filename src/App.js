import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import User from './Pages/User';
import HomePage from './Pages/HomePage';
import Header from './components/Header';
import LoginPage from './Pages/LoginPage';
import PartyList from './Pages/PartyList';
import SignupForm from './Pages/SignupForm';
import CreateParty from './Pages/CreateParty';
import PartyDetail from './Pages/PartyDetail';
import AuthContext from "../src/Auth/authContext";
import PartyAttended from './Pages/PartiesAttended';


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
          </Switch>
          {authCtx.isLoggedIn &&
          <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/user">
            <User />
          </Route>
          <Route path="/create-party">
            <CreateParty />
          </Route>
          <Route path="/view-parties">
            <PartyList all={true}/>
          </Route>
          <Route path="/your-parties">
            <PartyList all={false}/>
          </Route>
          <Route path="/party-detail/:partyId">
            <PartyDetail />
          </Route>
          <Route path="/parties-attended">
            <PartyAttended />
          </Route>
          </Switch>
}
      </div>
    </div>
  );
}

export default App;
