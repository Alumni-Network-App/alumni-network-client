import { useEffect } from "react";
import { useState } from "react";

const Reply = ({ replyId, content, sender }) => {

    const [text, setText] = useState(content);


    const handleEditClick = (e) => {
        e.preventDefault();
        document.getElementById("replyContent").disabled = false;
    }

    return (
        <div className="Reply">
            <div>
                <label>Content: </label>
                <textarea defaultValue={text} id="replyContent" rows={4} disabled={true} />
                <button onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    )
}

export default Reply;