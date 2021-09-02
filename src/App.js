import './App.css';
import Posts from './components/posts/Posts';
import CurrentUser from './components/users/CurrentUser';

function App() {

  /*
  const defaultPosts = [
    {
      id: "1",
      title: "A Very Hot Take",
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!"
    },
    {
      id: "2",
      title: "The Sauciest of Opinions",
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis suscipit repellendus modi unde cumque, fugit in ad necessitatibus eos sed quasi et! Commodi repudiandae tempora ipsum fugiat. Quam, officia excepturi!"
    }
  ];
  */

  const defaultTopics = [
    {
      id: "1",
      name: "sports",
      posts: [
        {
          id: "1",
          title: "post title",
          content: "this is a test"
        },
        {
          id: "2",
          title: "post title 2",
          content: "this is also a test"
        }
      ]
    },
    {
      id:"2",
      name: "arts",
      posts: [
        {
          id:"3",
          title: "art title",
          content: "this is an art post"
        }
      ]
    }
  ]

  const posts = defaultTopics.map(topic => <Posts key={topic.id} posts={topic.posts} />)

  return (
    <div className="App">
       <CurrentUser/>
     
      {posts}
    </div>
  );
}

export default App;
