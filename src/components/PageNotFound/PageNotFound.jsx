import { Link } from 'react-router-dom'
import NavBar from '../../hoc/NavBar'


const PageNotFound = () => {
    return (
        <main>
            <NavBar/>
            <h4> Hey, you seem lost.</h4>
            <p> This page does not exist.</p>
            <Link to="/"> Take me home.</Link>
        </main>
    )
}

export default PageNotFound