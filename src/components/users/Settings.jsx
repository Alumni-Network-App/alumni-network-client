import React from "react";
import { useForm } from "react-hook-form";
import { updateSettings } from "../../services/api/user";

const Settings = ( props ) => {

    // TODO: change fakeProps to props when able to access user information.

    const fakeProps = {
        id: 2,
        name: "Future",
        picture: "https://robohash.org/inventoreomnispossimus.png?size=50x50&set=set1",
        status: "active",
        bio: "I love work",
        funFact: "I love Burgers"
    }

    const {register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            name: fakeProps.name, 
            status: fakeProps.status,
            bio: fakeProps.bio,
            funFact: fakeProps.funFact,
        }
    });

    const onSubmit = async (data) => {
        data.picture = fakeProps.picture;
        updateSettings(data, fakeProps.id);
    }

    return(
        <main>
            <h1> My profile</h1>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Display name"
                        {...register("name")} 
                    />
                    <select {...register("status")}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="text" placeholder="Short Bio" 
                        {...register("bio", {
                            maxLength: 140,
                            message: "maximum 140 character in bio"
                            })} 
                    />
                    {errors.bio && <p>{errors.bio.message}</p>}
                    <input type="text" placeholder="Fun fact"
                        {...register("funFact", {
                            maxLength: {
                                value:40,
                                message:"max length is 40"
                            }})} 
                    />
                    {errors.funFact && <p>{errors.funFact.message}</p>}
                    <input type="submit" />
                </form>
            </div>
        </main>
    )
}

export default Settings