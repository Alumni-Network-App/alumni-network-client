import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import CurrentUser from "./components/Users/CurrentUser";
import GroupList from "./components/Groups/GroupList";
//import GroupDetail from "./components/Groups/GroupDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import PageExists from "./components/PageNotFound/PageExists";

function App() {

  const defaultTopics = [
    {
      id: "1",
      name: "sports",
      posts: [
        {
          id: "1",
          title: "post title",
          content: "this is a test",
        },
        {
          id: "2",
          title: "post title 2",
          content: "this is also a test",
        },
      ],
    },
    {
      id: "2",
      name: "arts",
      posts: [
        {
          id: "1",
          title: "art title",
          content: "this is an art post",
        },
      ],
    },
  ];



  const posts = defaultTopics.map((topic) => (
    <Posts key={topic.id} posts={topic.posts} />
  ));

 
  <div className="App">
    <CurrentUser style={{ border: "1px solid blue" }} />

   {posts}
  </div>
  

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component = { CurrentUser } />
        <Route path="/groups/all" component = { GroupList } />
        <Route path="/groups/:id" component = { PageExists } />
        <Route path={["/page-not-found", "*"]} component = {PageNotFound} />
      </Switch>
    </BrowserRouter> 
  );
}

export default App;
