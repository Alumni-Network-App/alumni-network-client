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
      <div className="h-screen bg-gray-100 flex  justify-center">
        <form
          className="py-6 px-8 h-96 mt-20 bg-white rounded shadow-xl"
          onSubmit={onSubmitHandler}
        >
          <div>
            <label
              htmlFor="groupName"
              className="block text-gray-800 font-bold"
            >
              Group Name
            </label>
            <input
              name="groupName"
              type="text"
              id="groupName"
              value={groupName}
              required
              placeholder="group name"
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="groupDescription"
              className="block text-gray-800 font-bold"
            >
              Group description
            </label>
            <textarea
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="group description"
              required
              maxLength="80"
              id="groupDescription"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>

          <div>
            <label>Select Group type: </label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>
          <button
            className="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white font-bold w-full text-center rounded"
            type="submit"
          >
            Create Group
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateGroup;
