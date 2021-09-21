const Reply = ({replyId, content, sender}) => {

    return (
        <div className="Reply">
            <label>Content: </label>
            <span>{replyId} {content} {sender}</span>
        </div>
    )
}

export default Reply;