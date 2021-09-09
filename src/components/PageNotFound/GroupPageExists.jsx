import { isGroupInDatabase } from "../../services/api/group"
import { Route, useHistory, useParams } from "react-router-dom";
import GroupDetail from "../Groups/GroupDetail";
import { useEffect } from "react";

const PageExists = () => {
    const { id } = useParams();
    const history = useHistory();
    
    useEffect(() =>{
        doesGroupExist();  
    })

    const doesGroupExist = async () => {
        const response = await isGroupInDatabase(id);
        if(!response){
            history.push('/page-not-found');
        }
    }
    
    return (
        <Route path="/groups/:id" component = { GroupDetail } />
    )
}

export default PageExists