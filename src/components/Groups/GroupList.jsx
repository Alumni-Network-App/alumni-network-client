import { useState, useEffect } from "react";
import { getPublicGroups } from "../../utils/API/group";
import GroupPreview from "./GroupPreview";

const GroupList = () => {

    const [data, setData] = useState([]);

    /**
     * TODO:
     * Add check for login / authenticated in if else block
     * then fetch group list
     */
    useEffect(() =>{
        getGroupList();
    }, [])

    /*
     * A function used to get group list
     */
    const getGroupList = async () => {
        try {
            const data = await getPublicGroups();
            setData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <section>
            <h3> Groups and stuff</h3>
            {data.map((group) =>
                <GroupPreview key={group.id} groupId={group.id} groupTitle={group.name} groupDescription={group.description} />
            )}           
        </section>
    )
}

export default GroupList