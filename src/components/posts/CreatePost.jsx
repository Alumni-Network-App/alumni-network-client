import { useState } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useForm } from "react-hook-form";
import { addPost } from "../../services/api/posts";
import { useHistory } from 'react-router-dom'

const CreatePost = ( props ) => {

    const [input, setInput] = useState();
    const [showPreview, setShowPreview] = useState(true);
    const { register, handleSubmit /*,formState: { errors } */} = useForm();
    const history = useHistory();

   // TODO: create function which gets a users groups and adds them to group object
    
   // Group objects -> used to create menu and display name 
    const groupObject = [
        {
            name: "Duis consequat dui nec nisi volutpat eleifend.",
            id: 2
        },
        {
            name: "Test example",
            id: 999
        }
    ]

    // TODO: create function which uses a groups id and appends it to 
    // the data object as "receiverID" and also adds receiver type
    //  which is then sent as a post request to the api

    const onSubmit = (data) => {
        data.topic = {
            id: data.topic
        }
        data.receiverType = "group"
        console.log(data);
        createPost(data);
        history.push('/groups/2');
    }


    const createPost = async (post) => {
        await addPost(post);
    }


   return (

        <div className="postPage">
            <h1>Hello world, this is create a post page with some amazing css</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Title"
                            {...register("title")} 
                        />

               
                <select {...register("topic")}>
                    <option value="1">Sports</option>
                    <option value="2">Lifestyle</option>
                    <option value="3">Food</option>
                    <option value="4">Movies</option>
                    <option value="5">Other</option>
                </select>
                
                <select {...register("receiverId")}>
                    <option value={groupObject[0].id}>{groupObject[0].name}</option>
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


