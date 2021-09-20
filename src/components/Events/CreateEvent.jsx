import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { addEvent } from "../../services/api/event"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./events.css"

const CreateEvent = () => {

    const [user, loading, error] = useAuthState(auth);    
    const [input, setInput] = useState();
    const [showPreview, setShowPreview] = useState(true);
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        if (loading) return;
        if (error) {
         return <>Error: {error}</>;
        }
        if (!user) return history.replace("/");
        
    }, [user, loading, error, history]);

    const createEvent = async (event) => {
        console.log("event added");
        await addEvent(event);
    }

    const onSubmit = (data) => {
        data.event = {
            id: data.event
        }
        data.receiverType = "event"
        console.log(data);
        createEvent(data);
        history.push('/dashboard'); // change this to the actual post when view thread is complete
    }

    return (
        <div className="postPage">
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="text" placeholder="Title"
                            {...register("name")} 
                />
                
                <form action="/action_page.php">
                    <h2>Select Event Banner</h2>
                    <input type="file" id="myFile" name="filename" {...register("bannerImg")}></input>
                </form>

                <label>
                    Start Date <br/>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  />
                </label>

                <label>
                    End Date <br/>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}  />
                </label>

                <textarea autoFocus className="textarea" value={input} {...register("description")} 
                    onChange= {(e) => setInput(e.target.value)}
                />

                <input type="text" placeholder="Topic/group/invitedUsers" {...register("groups")} />

                <input className="postPageSubmit" type="submit" />
            </form>

            <button onClick= {() => setShowPreview(!showPreview)}>Toggle preview</button>
                    {
                        showPreview ? <ReactMarkdown remarkPlugins={[gfm]} className="markdown" children={input} />  : null  
                    }
        </div>
    )
}

export default CreateEvent