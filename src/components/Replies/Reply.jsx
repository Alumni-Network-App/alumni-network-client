import { useEffect } from "react";
import { useState } from "react";
import { updateReply } from "../../services/api/reply";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const Reply = ({ replyId, content }) => {

    const [text, setText] = useState(content);


    const handleEditClick = () => {
        document.getElementById("reply-content").disabled = false;
        document.getElementById("submit-reply-button").hidden = false;
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
                <label>Reply: </label>
                <div>
                    <textarea value={text} id="reply-content" rows={4} disabled={true} maxLength={200} onChange={handleOnChange} />
                </div>
                <button onClick={handleEditClick}>Edit</button>
                <button onClick={handleSubmitClick} id="submit-reply-button" hidden={true}>Submit</button>
            </div>
        </div>
    )
}

export default Reply;