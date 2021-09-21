import { useEffect } from "react";
import { useState } from "react";
import { updateReply } from "../../services/api/reply";
import { getUserWithLink } from "../../services/api/user";
import "./reply.css"

const Reply = ({ senderLink, replyId, content }) => {

    const [text, setText] = useState(content);
    const [user, setUser] = useState("");

    useEffect(() => {
        setUserName();
    }, []);

    const setUserName = async () => {
        const user = await getUserWithLink(senderLink);
        setUser(user.name);
    }


    const handleEditClick = () => {
        const content = document.getElementById("reply-content");
        content.disabled = !content.disabled
        const submitButton = document.getElementById("submit-reply-button");
        submitButton.hidden = !submitButton.hidden;
    }

    const handleSubmitClick = (e) => {
        const reply = {
            "content": text
        }
        updateReply(replyId, reply);
        document.getElementById("reply-content").disabled = true;
        e.target.hidden = true;
    }

    const handleOnChange = (e) => {
        setText(e.target.value);
    }

    return (
        <div className="Reply">
            <div>
                <label>Reply: {user}</label>
                <div>
                    <textarea value={text} id="reply-content" rows={4} disabled={true} maxLength={200} onChange={handleOnChange} />
                </div>
                <div className="button-field">
                    <button onClick={handleEditClick} className="button" id="edit-reply-button">Edit</button>
                    <button onClick={handleSubmitClick} className="button" id="submit-reply-button" hidden={true}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Reply;
