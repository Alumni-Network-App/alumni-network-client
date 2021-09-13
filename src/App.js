import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import GroupList from "./components/Groups/GroupList";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import GroupPageExists from "./components/PageNotFound/GroupPageExists";
import TopicList from "./components/Topics/TopicList";
import TopicPageExists from "./components/PageNotFound/TopicPageExists";
import Dashboard from "./components/auth/Dashboard";
import Register from "./components/auth/Register";
/*
import Dashboard from "./components/auth/Dashboard";
import Login from "./components/auth/Login";

import Reset from "./components/auth/Reset";
*/

import DefaultHomePage from "./components/PageNotFound/DefaultHomePage";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/*
          <Route path="/reset" component={Reset} />
         
          */}

          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/" exact component={DefaultHomePage} />
          <Route path="/groups/all" component={GroupList} />
          <Route path="/groups/:id" component={GroupPageExists} />
          <Route path="/topics/all" component={TopicList} />
          <Route path="/topics/:id" component={TopicPageExists} />
          <Route path={["/page-not-found", "*"]} component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
