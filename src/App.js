import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Posts from "./components/Posts/Posts";
import CurrentUser from "./components/Users/CurrentUser";
import PageNotFound from "./components/PageNotFound/PageNotFound";

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
        <Route path="*" component = {PageNotFound} />
      </Switch>
    </BrowserRouter> 
  );
}

export default App;
