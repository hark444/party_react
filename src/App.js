import Header from './components/Header';
import SignupForm from './Pages/SignupForm';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import './App.css';
import { Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div>
      <Header />
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
      </Switch>
    </div>
  );
}

export default App;
