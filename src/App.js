import Header from './components/Header';
import SignupForm from './Pages/SignupForm';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import User from './Pages/User';
import CreateParty from './Pages/CreateParty';
import PartyList from './Pages/PartyList';
import PartyDetail from './Pages/PartyDetail';
import PartyAttended from './Pages/PartiesAttended';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import AuthContext from "../src/Auth/authContext"

function App() {

  const authCtx = React.useContext(AuthContext);

  // If not logged in (access_token){
    // 
  // }
  
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
