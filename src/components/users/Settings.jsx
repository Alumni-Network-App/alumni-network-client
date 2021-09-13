import React from "react";
import { useForm } from "react-hook-form";
//import { updateSettings } from "../../services/api/user";

const Settings = ( props ) => {

    // TODO: change fakeProps to props when able to access user information.

    const fakeProps = {
        userId: 2,
        displayName: "John Doe",
        picture: "https://robohash.org/inventoreomnispossimus.png?size=50x50&set=set1",
        workStatus: "active",
        shortBio: "I love work",
        funFact: "I love Burgers"
    }

    const {register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            displayName: fakeProps.displayName, 
            workStatus: fakeProps.workStatus,
            shortBio: fakeProps.shortBio,
            funFact: fakeProps.funFact,
        }
    });

    const onSubmit = async (data) => {
        data.userId = fakeProps.userId;
        console.log(data);
        //updateSettings(data);
    }

    return(
        <main>
            <h1> My profile</h1>
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="Display name"
                        {...register("displayName")} 
                    />
                    <select {...register("workStatus")}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="text" placeholder="Short Bio" 
                        {...register("shortBio", {
                            maxLength: 140,
                            message: "maximum 140 character in bio"
                            })} 
                    />
                    {errors.shortBio && <p>{errors.shortBio.message}</p>}
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