import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import GroupList from "./components/Groups/GroupList";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import GroupPageExists from "./components/PageNotFound/GroupPageExists";

/*
import Dashboard from "./components/auth/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
*/

import DefaultHomePage from "./components/PageNotFound/DefaultHomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/*
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/reset" component={Reset} />
          <Route path="/dashboard" component={Dashboard} />
          */}
        <Route path="/" exact component = { DefaultHomePage } /> 
        <Route path="/groups/all" component = { GroupList } />
        <Route path="/groups/:id" component = { GroupPageExists } />
        <Route path={["/page-not-found", "*"]} component = {PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
