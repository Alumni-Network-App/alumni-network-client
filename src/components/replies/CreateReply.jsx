import { useState } from "react";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { createReply } from "../../services/api/reply";
import Layout from "../layout/Layout";
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
  }, [loading, error, user, history]);

  const onSubmit = (data) => {
    data.content = content;
    submitReply(data);
    history.goBack();
  };

  const submitReply = async (reply) => {
    await createReply(props.location.state, reply);
  };

  return (
    <Layout>
      <div className="w-full mt-6 mx-auto max-w-3xl bg-white shadow p-8 text-gray-700">
        <form className="postForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-blue-600 hover:underlin mb-3">Create Reply</h1>
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500l"
          />

          <input value="Submit" type="submit"></input>
        </form>
      </div>
    </Layout>
  );
};

export default CreateReply;
