import { Link } from 'react-router-dom'

const TopicPreview = (props) => {
    const TOPIC_URL = "/topics/" + props.topicId;
    return (
        <section style={{ border: "1px solid black" }}>
            <p><Link to={{ pathname: TOPIC_URL, state: {props}}}>{props.topicTitle}</Link></p>            
            <p>{props.topicDescription}</p>
        </section>
    )
}

export default TopicPreview