import moment from "moment";
import { useEffect, useCallback, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { updateReply } from "../../services/api/reply";
import { getUserWithLink } from "../../services/api/user";

const Reply = ({ senderLink, replyId, content, lastUpdated }) => {
  const [user] = useAuthState(auth);
  const history = useHistory();
  const [text, setText] = useState(content);
  const [fromUserName, setUserName] = useState("");
  const [fromUserId, setUserId] = useState("");
  const [editable, setEditable] = useState(false);
  const [image, setImage] = useState("");

  const setUser = useCallback(async () => {
    const user = await getUserWithLink(senderLink);
    setUserName(user.name);
    setUserId(user.id);
    setImage(user.picture);
  }, [senderLink]);

  useEffect(() => {
    setUser();
    if (!user) return history.push("/");
    if (user.uid === fromUserId) setEditable(true);
  }, [fromUserId, setUser, history, user]);

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

  return (
    <div className="space-y-4">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {image ? (
            <img
              className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
              src={image}
              alt="user-profile img"
            />
          ) : (
            <img
              src="https://avatars.githubusercontent.com/u/67946056?v=4"
              alt="avatar"
              className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
            />
          )}
        </div>
        <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <strong> {fromUserName}</strong>
          <span className="text-xs text-gray-400 pl-3">
            {moment(lastUpdated).calendar()}
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
      </div>
    </div>
  );
};

export default Reply;
