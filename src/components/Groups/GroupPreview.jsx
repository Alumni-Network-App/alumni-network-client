import { Link } from 'react-router-dom'

const GroupPreview = (props) => {
    const GROUP_URL = "/groups/" + props.groupId;
    return (
        <section style={{ border: "1px solid black" }}>
            <p><Link to={{ pathname: GROUP_URL, state: {props}}}>{props.groupTitle}</Link></p>            
            <p>{props.groupDescription}</p>
        </section>
    )
}

export default GroupPreview