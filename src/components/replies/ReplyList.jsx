import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { getRepliesToPost } from "../../services/api/reply";
import Reply from "./Reply";
import "./reply.css";

const ReplyList = ({ postId }) => {

    const [user, loading, error] = useAuthState(auth);
    const [toggleClass, setToggleClass] = useState("Show");
    const history = useHistory();

    const [replies, setReplies] = useState([]);

    useEffect(() => {
        if (loading) return;
        if (error) {
            return <>Error: {error} </>;
        }
        if (!user) return history.push('/');

        getReplyList();
    }, [user, loading, error, history]);


    const getReplyList = async () => {
        try {
            const data = await getRepliesToPost(postId);
            setReplies(data);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const toggleReplies = (e) => {
        setToggleClass(e.target.value);
        e.target.value = (e.target.value === "Hide") ? "Show" : "Hide";
    }

    return (
        <div className="ReplyList">
            <div id="button-center">
                <button value="Hide" className="button" id="toggle-button" onClick={toggleReplies}>Toggle Replies</button>
            </div>
            <div id="reply-list" className={toggleClass}>
                {
                    replies.map(({ id, content, user }) => <Reply key={id} replyId={id} content={content} senderLink={user} />)
                }
            </div>

        </div>
    );

}

export default ReplyList;