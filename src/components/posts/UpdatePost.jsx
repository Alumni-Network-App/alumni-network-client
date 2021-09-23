

const UpdatePost = () => {
    
      const [editable, setEditable] = useState(false);

  const [title, setTitle] = useState(postTitle);
  const [text, setText] = useState(content);
  const handleEditClick = () => {
    const content = document.getElementById("reply-content");
    content.disabled = !content.disabled;
    const submitButton = document.getElementById("submit-reply-button");
    submitButton.hidden = !submitButton.hidden;
  };

  const handleSubmitClick = (e) => {
    const updatedPost = {
      content: text,
      postTitle: title,
    };
    updatePost(updatedPost, id);

    document.getElementById("reply-content").disabled = true;
    e.target.hidden = true;
  };


      const handleOnChange = (e) => {
    setText(e.target.value);
  };
  const handleTitleOnchange = (e) => {
    setTitle(e.target.value);
  };

    return (
        
    )
    
}

export default UpdatePost