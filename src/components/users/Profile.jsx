import React, { useState, useEffect } from "react";
import { getUserWithLink, getUserUsingId } from "../../services/api/user";

const Profile = ({ userId, link }) => {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      if (link) {
        const userData = await getUserWithLink(userId);
        if (userData) {
          setUserData(userData);
        }
      } else {
        const userData = await getUserUsingId(userId);
        if (userData) {
          setUserData(userData);
        }
      }
    };

    getUserData();
  }, [userId, link]);
  /**
   * A function used to toggle the modal on click. 
   */
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <strong type="button" onClick={toggleModal} className="cursor-pointer">
        {link ? userData.name : userData.name}
      </strong>

      {modal && (
        <div className="modal">
          <div>
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              {userData.picture ? (
                <img
                  className='cw-32 mx-auto rounded-full -mt-20 border-8 border-white"'
                  src={userData.picture}
                  alt="user profile pic"
                />
              ) : (
                <img
                  src="https://avatars.githubusercontent.com/u/67946056?v=4"
                  alt="avatar"
                  className="w-32 mx-auto rounded-full -mt-20 border-8 border-white"
                />
              )}

              <div className="text-center mt-2 text-3xl font-medium">
                {userData.name}
              </div>
              <div className="text-center mt-2 font-light text-sm">
                {userData.status}
              </div>
              <div className="text-center font-normal text-lg">
                <p> {userData.funFact} </p>
              </div>
              <div className="px-6 text-center mt-2 font-light text-sm">
                <p>{userData.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
