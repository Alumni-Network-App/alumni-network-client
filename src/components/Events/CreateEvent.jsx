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
    const [endDate, setEndDate] = useState();
    
    
    
    const handleStartDate = (date) =>{
        setStartDate(date);
        console.log(date);
        // setEndDate(null);
    }

    const handleEndDate = (date) => {
        setEndDate(date);        
    }
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
        const userId = {"2TSqo0Zn8aXcdEZOryVdxJ5OAvr2": Object};
        const userArray = [];
        userArray.push(userId);
        data.event = {
            name: data.name,
            description: data.description,
            bannerImg: data.bannerImg[0].name,
            startTime: data.start_time,
            endTime: data.end_time,
            invitedUsers: userArray
        }
        data.receiverType = "event"
        console.log(userArray[0] + "tjenaaaaa");
        createEvent(data);
        // history.push('/dashboard'); // change this to the actual post when view thread is complete
    }

    return (
        <div className="postPage">
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="text" placeholder="Title"
                    {...register("name")} 
                />
                
                
                <h2>Select Event Banner</h2>
                <input type="file" id="myFile" name="filename" {...register("bannerImg")}></input>
                <br/>
                

                <label>
                    Start Date <br/>
                    {/* <DatePicker selected={startDate} 
                        minDate={new Date()}
                         
                        onChange={handleStartDate}
                        ref={register("start_time")}  
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                    /> */}
                    <input                        
                        type="datetime-local"
                        minDate={new Date()}
                        onChange={handleStartDate}  
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                        {...register("start_time")}             
                    />
                    
                </label>
                <br/>

                <label>
                    End Date <br/>
                    {/* <DatePicker selected={endDate} 
                        minDate={startDate}
                        onChange={handleEndDate}
                        ref={register("end_time")}  
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                     /> */}

                    <input                        
                        type="datetime-local"
                        minDate={startDate}
                        onChange={handleEndDate}  
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                        {...register("end_time")}             
                    />

                </label>

                <textarea autoFocus className="textarea" value={input}                 
                    onChange= {(e) => setInput(e.target.value)}
                    {...register("description")} 
                />

                <select {...register("category")}>
                    <option value="Topics" 
                        {...register("topics")} 
                    >Select...</option>
                    <option value="Groups" {...register("Groups")}>Category A</option>
                    <option value="invitedUsers" {...register("invitedUsers")}>Category B</option>
                </select>

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