import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./posts.css"
import { addUsersTopic } from "../../services/api/topic";
export default function TopicModal() {

    const [modal, setModal] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        //console.log(data);
        setModal(!modal);
        addUsersTopic(data);
    }

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
        <button type="button" onClick={toggleModal} className="createTopic">
          Create a topic
        </button>
        <br></br>
    
        {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Create a topic</h2> 
                    <button type="button" className="close-modal" onClick={toggleModal}>
                            Close
                    </button>

                    <div className="topicContent">
                        <div className="newTopic">
                            <form onSubmit= {handleSubmit(onSubmit)}>
                                <h3> Topic name </h3>
                                <input className="createTopicTitle" {...register("name", { required: true, maxLength: 20 })} />
                                {errors.name?.type === 'required' && "A topic name is required"}
                                <h3> Description </h3>
                                <textarea className="createTopicDescription" {...register("description", { required: true, maxLength: 50 })} />
                                {errors.description?.type === 'required' && "Enter a description of max 50 characters"}
                                <input type="submit" />
                            </form>
                        </div>
                    </div>
                </div>
          </div>
        )}
        </>
    );
}
