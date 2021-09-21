import { useState } from 'react';
import Select from 'react-select';
import { addUserToGroup } from '../../services/api/group';

const AddGroup = ({publicGroups}) => {
    const [selectedOption, setSelectedOption] = useState(null);  
    //const history = useHistory();
    const joinGroup = async (groupId) =>{
        addUserToGroup(groupId);
    }
 
    return (
        <div>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={publicGroups}
                
            />

            {
                selectedOption ? <button type="button" className="previewText"
                onClick={() => {joinGroup(selectedOption.value);}}
                style={{width: "100%"}}>
                Join {selectedOption.label}
            </button>  : null  
            }
            
        </div>
    )
}

export default AddGroup
