import Header from './components/Header';
import NavBar from './components/NavBar';
import SignupForm from './Pages/SignupForm';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import User from './Pages/User';
import './App.css';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
      <div className='main_body'>
        <NavBar />
        <Switch>
          <Route path="/sign-up">
            <SignupForm />
          </Route>
          <Route path="/login">
            <LoginPage />
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
