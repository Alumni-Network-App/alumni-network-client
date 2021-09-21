import { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { createReply } from "../../services/api/reply";
import "./reply.css";

const CreateReply = (props) => {
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const { handleSubmit } = useForm();
    
    const [content, setContent] = useState("");

    useEffect(() => {
        if (loading) return;
        if (error) return <>Error: {error}</>;
        if (!user) return history.push("/");
    }, [loading, error, user, history])

    const onSubmit = (data) => {
        data.content = content;
        submitReply(data);
        history.goBack();
    }

    const submitReply = async (reply) => {
        await createReply(props.location.state, reply);
    }

    return(
        <div className="CreateReply">
            <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
                <h1>Create Reply</h1>
                <textarea autoFocus value={content} onChange= {(e) => setContent(e.target.value)}/>
                <input  value="Submit" type="submit"></input>
            </form>
        </div>
    )

}

export default CreateReply;