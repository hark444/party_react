import Header from './components/Header';
import SignupForm from './Pages/SignupForm';
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
        <Route path="login">
          <div>
            <h2>Login Page</h2>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
