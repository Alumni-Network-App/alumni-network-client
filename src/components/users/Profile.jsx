import React, { useState, useEffect } from "react";
import { getUserWithLink, getUserUsingId} from "../../services/api/user";

 const  Profile = ({userId, link}) => {
    const [modal, setModal] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const getUserData = async () => {
            if(link){
                const userData = await getUserWithLink(userId);
                if(userData){
                    setUserData(userData);
                }
            }else {
                const userData = await getUserUsingId(userId);
                if(userData){
                    setUserData(userData);
                }
            }
        }
        
        getUserData();
      }, [userId, link]);
    
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
            style={link ? {color:"000000", fontWeight:"400", cursor:"pointer"} :
                {cursor: "pointer", marginLeft:"0",fontWeight:"600", color:"#000000", paddingRight:"100%"}}>
                {link ? "Created by: " + userData.name : userData.name}
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