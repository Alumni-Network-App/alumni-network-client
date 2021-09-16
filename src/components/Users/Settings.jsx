import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUser, updateSettings } from "../../services/api/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom'


const Settings = () => {
  const [userData, setUserData] = useState([]);
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  // TODO: change fakeProps to props when able to access user information.

  useEffect(() => {
    if (loading) return;
    if (error) {
     return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");
    async function setUserInfo (user) {
      const data = await getUser(user);
      const userInfo = {
        name: data.name,
        picture: data.picture,
        status: data.status,
        bio: data.bio,
        funFact: data.funFact
      }
      setUserData(userInfo);
    }    
    setUserInfo(user);
}, [user, loading, error, history]);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userData.name,
      status: userData.status,
      bio: userData.bio,
      funFact: userData.funFact,
    },
  });

  const onSubmit = async (data) => {
    data.picture = "https://robohash.org/inventoreomnispossimus.png?size=50x50&set=set1";
    updateSettings(data);
  };

  return (
    <main>
      <h1> My profile</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Display name" {...register("name")} />
          <select {...register("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Short Bio"
            {...register("bio", {
              maxLength: 140,
              message: "maximum 140 character in bio",
            })}
          />
          {errors.bio && <p>{errors.bio.message}</p>}
          <input
            type="text"
            placeholder="Fun fact"
            {...register("funFact", {
              maxLength: {
                value: 40,
                message: "max length is 40",
              },
            })}
          />
          {errors.funFact && <p>{errors.funFact.message}</p>}
          <input type="submit" />
        </form>
      </div>
    </main>
  );
};

export default Settings;
