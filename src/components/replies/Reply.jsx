import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { updateReply } from "../../services/api/reply";
import { getUserWithLink } from "../../services/api/user";
import Profile from "../users/Profile";
import "./reply.css";

const Reply = ({ senderLink, replyId, content, lastUpdated }) => {
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [text, setText] = useState(content);
    const [fromUserName, setUserName] = useState("");
    const [fromUserId, setUserId] = useState("");
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setUser();
        if(!user) return history.push("/");
        if(user.uid === fromUserId) setEditable(true);
    }, [fromUserId]);

    const setUser = async () => {
        const user = await getUserWithLink(senderLink);
        setUserName(user.name);
        setUserId(user.id);
    };

    const handleEditClick = () => {
        const content = document.getElementById("reply-content");
        content.disabled = !content.disabled;
        const submitButton = document.getElementById("submit-reply-button");
        submitButton.hidden = !submitButton.hidden;
    };

    const handleSubmitClick = (e) => {
        const reply = {
            content: text,
        };
        updateReply(replyId, reply);
        document.getElementById("reply-content").disabled = true;
        e.target.hidden = true;
    };

    const handleOnChange = (e) => {
        setText(e.target.value);
    };
    console.log(fromUserId)
    return (
        <div className="flex mb-3 border rounded-lg ">
            <div className="flex-col w-full  bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                <Profile userId={fromUserId} link={false} />
                <span className="text-xs text-gray-400 ">
                    {moment(lastUpdated).format("lll")}
                </span>
                <textarea
                    value={text}
                    id="reply-content"
                    rows={2}
                    disabled={true}
                    className="w-full  resize-none text-xs sm:text-sm mt-4"
                    maxLength={200}
                    onChange={handleOnChange}
                />
                <button
                    onClick={handleEditClick}
                    className="text-blue-600 hover:underline"
                    id="edit-reply-button"
                    hidden={!editable}
                >
                    Edit
                </button>
                <button
                    onClick={handleSubmitClick}
                    className="text-blue-600 hover:underline"
                    id="submit-reply-button"
                    hidden={true}
                >
                    Submit
                </button>
            </div>
            <></>
        </div>
    );
};

export default Reply;
