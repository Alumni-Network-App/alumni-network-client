import { Link } from 'react-router-dom'


const PageNotFound = () => {
    return (
        <section>
            <h4> Hey, you seem lost.</h4>
            <p> This page does not exist.</p>
            <Link to="/"> Take me home.</Link>
        </section>
    )
}

export default PageNotFound