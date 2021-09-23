import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import GroupList from "./components/groups/GroupList";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import GroupPageExists from "./components/pageNotFound/GroupPageExists";
import TopicList from "./components/topics/TopicList";
import TopicPageExists from "./components/pageNotFound/TopicPageExists";
import Settings from "./components/users/Settings";
import CreatePost from "./components/posts/CreatePost";
import Dashboard from "./components/auth/Dashboard";
import Register from "./components/auth/Register";
import Reset from "./components/auth/Reset";
import Login from "./components/auth/Login";
import ReplyList from "./components/replies/ReplyList";
import CreateReply from "./components/replies/CreateReply";
import CreateGroup from "./components/groups/CreateGroup";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/reset" component={Reset} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/groups/all" component={GroupList} />
          <Route path="/groups/:groupId" component={GroupPageExists} />
          <Route path="/topics/all" component={TopicList} />
          <Route path="/topics/:id" component={TopicPageExists} />
          <Route path="/post/replies" component={ReplyList} />
          <Route path="/reply/post/:id" component={CreateReply} />
          <Route path="/profile/settings" component={Settings} />
          <Route path="/profile/create-post" component={CreatePost} />
          <Route path="/profile/create-group" component={CreateGroup} />

          <Route path={["/page-not-found", "*"]} component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
