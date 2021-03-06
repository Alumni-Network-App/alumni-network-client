import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { getRepliesToPost } from "../../services/api/reply";
import Reply from "./Reply";

const ReplyList = ({ postId }) => {
  const [user, loading, error] = useAuthState(auth);
  // const [toggleClass, setToggleClass] = useState("Show");
  const history = useHistory();

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error} </>;
    }
    if (!user) return history.push("/");

    const getReplyList = async () => {
      try {
        const data = await getRepliesToPost(postId);
        setReplies(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    getReplyList();
  }, [user, loading, error, history, postId]);

  return (
    <div className="ReplyList">
      {/* <div id="reply-list" className={toggleClass}> */}
      <div id="reply-list">
        {replies.map(({ id, content, user, lastUpdated }) => (
          <Reply
            key={id}
            replyId={id}
            lastUpdated={lastUpdated}
            content={content}
            senderLink={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ReplyList;
