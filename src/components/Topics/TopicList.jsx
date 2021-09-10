import { useState, useEffect } from "react";
import { getTopics } from "../../services/api/topic";
import TopicPreview from "./TopicPreview";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../../hoc/NavBar";

const TopicList = () => {

    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState('');

    /**
     * TODO:
     * Add check for login / authenticated in if else block
     * then fetch group list
     */
    useEffect(() =>{
        getTopicList();
    }, [])

    /*
     * A function used to get a list pf topics
     */
    const getTopicList = async () => {
        try {
            const data = await getTopics();
            setData(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    /**
     * Filter topic searches 
     */
    const filterTopics = data.filter(val => (
        val.name.toLowerCase().includes(searchData.toLowerCase()) ||
        val.description.toLowerCase().includes(searchData.toLowerCase())
        )).map((topic) =>
        <TopicPreview key={topic.id} topicId={topic.id} topicTitle={topic.name} topicDescription={topic.description} />
    )  

    return (
        <main>
            <NavBar/>
                <h3> Topics and stuff</h3>
                <SearchBar onChange={(value) => setSearchData(value)}/>
                {filterTopics}
        </main>
    )
}

export default TopicList
