import Header from './components/Header';
import SignupForm from './Pages/SignupForm';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import User from './Pages/User';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import {useState} from "react"

function App() {
  
  const [username, setUsername] = useState("User")

  function setUserName(userName){
    setUsername(userName)
  }

  return (
    <div>
      <Header username={username}/>
      <div className='main_body'>
        <Switch>
          <Route path="/sign-up">
            <SignupForm />
          </Route>
          <Route path="/login">
            <LoginPage setName={setUserName} />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/user">
            <User />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
