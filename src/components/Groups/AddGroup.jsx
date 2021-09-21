import { useState } from 'react';
import Select from 'react-select';
import { addUserToGroup } from '../../services/api/group';

const AddGroup = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    

    const options = [
        {value: 2, label: 'Test group 2'},
        {value: 7, label: 'Test group 7'},
        {value: 28, label: 'Test group 28'},
        
    ];


    const joinGroup = async (groupId) =>{
        console.log(groupId);
        //addUserToGroup(groupId);
    }
 
    return (
        <div>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
            />

            {
                selectedOption ? <button type="button" 
                onClick={() => {joinGroup(selectedOption.value);}}
                style={{border: "2px solid black", padding: "3px", background:"#ffffff"}}>
                Join {selectedOption.label}
            </button>  : null  
            }
            
        </div>
    )
}

export default AddGroup