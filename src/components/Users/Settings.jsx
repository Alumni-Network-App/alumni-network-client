import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateSettings } from "../../services/api/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useHistory } from 'react-router-dom'


const Settings = ( {currentUser} ) => {
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  // TODO: change fakeProps to currentUser when the user profile component is complete

  useEffect(() => {
    if (loading) return;
    if (error) {
     return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");
}, [user, loading, error, history]);

  const fakeProps = {
    id: 2,
    name: "Future",
    picture:
      "https://robohash.org/inventoreomnispossimus.png?size=50x50&set=set1",
    status: "active",
    bio: "I love work",
    funFact: "I love Burgers",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: fakeProps.name, // change to currentUser.name when integrated
      status: fakeProps.status, // change to currentUser.status when integrated
      bio: fakeProps.bio, // change to currentUser.bio when integrated
      funFact: fakeProps.funFact, // change to currentUser.funFact when integrated
    },
  });

  const onSubmit = async (data) => {
    fakeProps.picture = "https://robohash.org/inventoreomnispossimus.png?size=50x50&set=set1";
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
