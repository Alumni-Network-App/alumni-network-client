import { useState, useEffect } from "react";
import { getPublicGroups } from "../../services/api/group";
import GroupPreview from "./GroupPreview";
import SearchBar from "../SearchBar/SearchBar";

const GroupList = () => {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('');

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
            console.log(data)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    /**
     * Filter group searches 
     */
    const filterGroups = data.filter(val => (
        val.name.toLowerCase().includes(searchData.toLowerCase()) ||
        val.description.toLowerCase().includes(searchData.toLowerCase())
        )).map((group) =>
        <GroupPreview key={group.id} groupId={group.id} groupTitle={group.name} groupDescription={group.description} />
    )  

    return (
        <section>
            <h3> Groups and stuff</h3>
            <SearchBar onChange={(value) => setSearchData(value)}/>
            {filterGroups}
        </section>
    )
}

export default GroupList
