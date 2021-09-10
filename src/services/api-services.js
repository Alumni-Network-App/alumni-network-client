import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:8080/api/v1/firebase/user`,
});

const getUsers = async () => {
  //   await api.get("/").then((res) => {
  //     //console.log(res.data)
  //   });
  let data = await api.get("/").then(({ data }) => data);
  return await data;
};

const createUser = async (
  uid,
  username,
  photoURL = `https://robohash.org/nostrumoditesse.png?size=150x150&set=set1`
) => {
  const res = await api.post("/", {
    id: uid,
    name: username,
    picture: photoURL,
  });
  //console.log({ res });
  return res;
};

export const service = {
  getUsers,
  createUser,
};
