import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Controller, useForm } from "react-hook-form";
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
    const { register, handleSubmit, control, setValue } = useForm();
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [endDate, setEndDate] = useState("");


    //test 
    const handleEndDateTest = datechange => {
        setValue('start_time', datechange, {
            shouldDirty: true
        })
        setStartDate(datechange)
    }
    const handleStartDate = (startDate) =>{
        setValue('start_time', startDate, {
            shouldDirty: true
        })
        setStartDate(startDate);
        // setEndDate(null);
        console.log("date is " + startDate)
    }

    const handleEndDate = (endDate) => {
        setEndDate(endDate);        
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
                
                {/* <form>
                    <h2>Select Event Banner</h2>
                    <input type="file" id="myFile" name="filename" {...register("bannerImg")}></input>
                </form>  */}

                <label >
                    Start Date <br/>
{/*                     
                    <DatePicker selected={startDate}
                        
                        minDate={startDate}
                        {...register("start_time")}
                        onChange={handleStartDate}
                        
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                        
                    /> */}
                    <Controller name='start_time' control={control} render={() => (
                        <DatePicker {...register("start_time")}
                        onChange={handleStartDate}
                        
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm" />
                    )} />
                    
                </label>

                <label >
                    End Date <br/>
                    <DatePicker selected={endDate} 
                        minDate={startDate}
                        {...register("end_time")} 
                        onChange={handleEndDate} 
                        
                        showTimeSelect
                        dateFormat="Pp"
                        timeFormat="HH:mm"
                    />
                </label>

                <textarea autoFocus className="textarea" value={input} {...register("description")} 
                    onChange= {(e) => setInput(e.target.value)}
                />

                <select {...register("category")}>
                
                    <option value="Topics" {...register("Topics")}>Topics</option>
                    <option value="Groups" {...register("Groups")}>Groups</option>
                    <option value="invitedUsers" {...register("invitedUsers")}>invitedUsers</option>
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