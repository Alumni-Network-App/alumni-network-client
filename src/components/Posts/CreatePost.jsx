import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useForm } from "react-hook-form";
import { addPost } from "../../services/api/posts";
import { useHistory } from 'react-router-dom'
import { getUsersGroups } from "../../services/api/group";
import { getUsersTopics } from "../../services/api/topic";

const CreatePost = () => {
    const [groupObjects, setGroupObjects] = useState([]);
    const [topicObjects, setTopicObjects] = useState([]);     

    useEffect(() => {
        getGroupList();
        getTopicList();
    }, []);

    const [input, setInput] = useState();
    const [showPreview, setShowPreview] = useState(true);
    const { register, handleSubmit /*,formState: { errors } */} = useForm();
    const history = useHistory();



    const getGroupList = async () => {
        try {
          const data = await getUsersGroups(4); // set this to user id 
          setGroupObjects(data);
        } catch (error) {
          console.error("Error:", error);
        }
    };

    const getTopicList = async () => {
        try {
          const data = await getUsersTopics(4); // set this to user id 
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
        history.push('/groups/2'); // change this to the actual post when view thread is complete
    }


    const createPost = async (post) => {
        await addPost(post);
    }


    const getGroupListOptions = groupObjects
    .map((group) => (
      <option key={group.id} value={group.id}>{group.name}</option>
    ));

   const getTopicListOptions = topicObjects
    .map((topic) => (
      <option key={topic.id} value={topic.id}>{topic.name}</option>
    ));
    
   return (

        <div className="postPage">
            <h1>Create post</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title"
                            {...register("title")} 
                        />

                <select {...register("topic")}>
                    {getTopicListOptions}
                </select>
                
                <select {...register("receiverId")}>
                    {getGroupListOptions}
                </select>

                <textarea autoFocus className="textarea" value={input} {...register("content")} 
                    onChange= {(e) => setInput(e.target.value)}
                />
                <input className="postPageSubmit" type="submit" />
            </form>

            <button onClick= {() => setShowPreview(!showPreview)}>Toggle preview</button>
                    {
                        showPreview ? <ReactMarkdown remarkPlugins={[gfm]} className="markdown" children={input} />  : null  
                    }
        </div>
    )
}

export default CreatePost


