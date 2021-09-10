import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/auth/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";

// import Topics from "./components/topics/Topics";
// import CurrentUser from "./components/users/CurrentUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>

      {/* <CurrentUser style={{ border: "1px solid blue" }} />

      <hr />

      <Posts /> 
      <Topics />*/}
    </div>
  );
}

export default App;
