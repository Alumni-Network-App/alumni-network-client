import { useState } from "react";
import Select from "react-select";
import Layout from "../layout/Layout";
import { auth } from "../../firebase";
import { DEFAULT_DOMAIN_URL } from "../../resource/constants";

const DOMAIN_URL = DEFAULT_DOMAIN_URL;
const BASE_URL = DOMAIN_URL + "/api/v1/group";

const options = [
  { value: true, label: "Public" },
  { value: false, label: "Private" },
];

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const [selectedOption, setSelectedOption] = useState(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    createGroup();
    // console.log(groupDescription, groupName, selectedOption.value);
  };

  const createGroup = async () => {
    const GROUP_URL = BASE_URL;
    const accessToken = await auth.currentUser
      .getIdToken(true)
      .then((idToken) => idToken);
    try {
      const response = await fetch(GROUP_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: groupName,
          description: groupDescription,
          private: selectedOption.value,
        }),
      });
      const data = await response.json();
      console.log("data coming from groups", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <form onSubmit={onSubmitHandler}>
        <input
          style={{ margin: "2rem" }}
          name="groupName"
          type="test"
          value={groupName}
          required
          placeholder="group name"
          onChange={(e) => setGroupName(e.target.value)}
        />
        <br />
        <textarea
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="group description"
          required
          maxLength="80"
        />
        <br />
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <button type="submit">Create Group</button>
      </form>
    </Layout>
  );
};

export default CreateGroup;
