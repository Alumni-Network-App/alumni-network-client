import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useForm } from "react-hook-form";
import { addPost } from "../../services/api/posts";
import { useHistory } from 'react-router-dom'
import { getUsersGroups } from "../../services/api/group";
import { getUsersTopics } from "../../services/api/topic";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import "./posts.css"
import Modal from "./CreateTopic";

const CreatePost = () => {
    const [user, loading, error] = useAuthState(auth);
    const [groupObjects, setGroupObjects] = useState([]);
    const [topicObjects, setTopicObjects] = useState([]);     
    const [input, setInput] = useState();
    const [showPreview, setShowPreview] = useState(false);
    const history = useHistory();

    const { register, handleSubmit ,formState: { errors } } = useForm();
   

    useEffect(() => {
        if (loading) return;
        if (error) {
         return <>Error: {error}</>;
        }
        if (!user) return history.replace("/");
        getGroupList(user);
        getTopicList(user);
    }, [user, loading, error, history]);

    //console.log(auth.currentUser.uid)

   
    const getGroupList = async (user) => {
        try {
          const data = await getUsersGroups(user); // set this to user id 
          setGroupObjects(data);
        } catch (error) {
          console.error("Error:", error);
        }
    };

    const getTopicList = async (user) => {
        try {
          const data = await getUsersTopics(user); // set this to user id 
          setTopicObjects(data);
        } catch (error) {
          console.error("Error:", error);
        }
    };

    const onSubmit = (data) => {
        data.topic = {
            id: data.topic
        }
        data.receiverType = "group"
        console.log(data);
        createPost(data);
        history.push('/dashboard'); // change this to the actual post when view thread is complete
    }


    const createPost = async (post) => {
        await addPost(post);
    }

    // TODO: fix default if user is in no groups // same for topics 
    const getGroupListOptions = groupObjects
    .map((group) => (
      <option key={group.id} value={group.id}>{group.name}</option>
    ));


    let topicOptions = [];
    const getTopicListOptions = topicObjects
        .map((topic) => (
        <option key={topic.id} value={topic.id}>{topic.name}</option>
    ));
    

    topicOptions.push(getTopicListOptions);
    topicOptions.push(<Modal/>);

    // fix validation form 

   return (

        <div className="postPage">
            <h1>Create post</h1>
            {topicOptions[1]}
            <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title"
                            {...register("title", { required: true, maxLength: 20 })} 
                        />
                
                

                <select className="groupSelect" {...register("receiverId")}>
                    {/*<option value="DEFAULT" disabled>Choose a group ...</option>*/}
                    <option value="2" >GROUP 2 FOR TEST PURPOSES</option>
                    {getGroupListOptions}
                </select>
                
                <div className="selectCreateTopic">
                    <select className="topicSelect" {...register("topic")}>
                    {/*<option value="DEFAULT" disabled>Choose a topic ...</option>*/}
                    <option value="3" >TOPIC 3 FOR TEST PURPOSES</option>
                        {topicOptions[0]}
                    </select>
                    
                </div>
                
                <div className="textmarkdown">
                    <textarea autoFocus className="textarea" value={input} {...register("content", { required: true, maxLength: 140 })} 
                        onChange= {(e) => setInput(e.target.value)}
                    />

                    {
                        showPreview ? <ReactMarkdown remarkPlugins={[gfm]} className="markdown" children={input} />  : null  
                    }

                </div>
                <span style={{color: "red"}} role="alert">{errors.title?.type === 'required' && "Enter a title of maximum 20 characters"}</span>
                <br></br> {/* real bad quick fix*/}
                <span style={{color: "red"}} role="alert">{errors.content?.type === 'required' && "Enter a post body (max 140 characters)"}</span>

                <div className="postButtons">
                    <button className="previewText" type="button" onClick= {() => setShowPreview(!showPreview)}>Preview post</button>
                    <input className="postPageSubmit" type="submit" />
                </div>
            </form>
                   
        </div>
    )
}

export default CreatePost


