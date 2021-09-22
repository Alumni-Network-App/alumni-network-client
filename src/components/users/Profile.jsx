import React, { useState, useEffect } from "react";
import { getUserWithLink} from "../../services/api/user";

 const  Profile = ({userId}) => {
    const [modal, setModal] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            const userData = await getUserWithLink(userId);
            if(userData){
                setUserData(userData);
            }
        }
        
        getUserData();
      }, [userId]);
    
    const toggleModal = () => {
      setModal(!modal); 
    };
    
    if(modal) {
      document.body.classList.add('active-modal');
    } else {
      document.body.classList.remove('active-modal');
    }
  
    return (
        <>
            <p type="button" onClick={toggleModal} className="createTopic"
            style={{width: "50%", float:"right", color:"rgba(0,0,0, 0.5)", cursor:"pointer"}}>
                 Created by: {userData.name}
            </p>
            <br></br>
    
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h1 className="">{userData.name}</h1>
                        
                        {userData.picture ? (
                        <img
                            className='className="object-cover w-10 h-10 mx-4 rounded-full"'
                            src={userData.picture}
                            alt="user profile pic"
                        />
                        ) : (
                        <img
                            src="https://avatars.githubusercontent.com/u/67946056?v=4"
                            alt="avatar"
                            className="object-cover w-10 h-10 mx-4 rounded-full"
                        />
                        )}
                        <h4>{userData.status}</h4>
                        <p>{userData.funFact}</p>
                        <p>{userData.bio}</p>
                    </div>
            </div>
            )}
        </>
    );
}

export default Profile