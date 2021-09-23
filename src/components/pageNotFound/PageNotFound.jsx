import { Link } from 'react-router-dom'
//import NavBar from '../../hoc/NavBar'


const PageNotFound = () => {
    return (
        <main>
            {/*<NavBar/>*/}
            <div style={{border: "2px solid #cccccc", padding: "50px", background:"#ffffff", height:"30%",
                         minWidth:"50%", marginLeft:"25%", marginRight:"25%",
                        marginBottom:"10%",marginTop:"10%", position:"fixed", 
                        borderRadius:"14px", fontSize:"2vw"}}>
                <h1 className="mb-8 "> Hey, you seem lost.</h1>
                <Link className = "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/dashboard">
                    Home page
                </Link>
            </div>
            
        </main>
    )
}

export default PageNotFound
