import { useEffect/*, useState */ } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { updateSettings } from "../../services/api/user";
import Layout from "../layout/Layout";
import { getUser } from "../../services/api/user";
const Settings = () => {
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (loading) return;
    if (error) {
      return <>Error: {error}</>;
    }
    if (!user) return history.replace("/");

    async function getUserInfo (user) {
      const data = await getUser(user);
      if(data){
        reset({
          name: data.name,
          status: data.status,
          bio: data.bio,
          funFact: data.funFact
        })
      }
    };
    getUserInfo(user);
  }, [user, loading, error, history, reset]);

  const onSubmit = async (data, e) => {
    updateSettings(data);
    e.target.reset();
    history.push("/dashboard");
  };

  return (
    <Layout>
      <div className="min-h-screen p-6  flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">
              Update your Info here..
            </h2>
            <p className="text-gray-500 mb-6">
              When you're done click submit to update. Give it a try!
            </p>

            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <form
                  className="lg:col-span-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label>Full Name</label>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="status">Status</label>
                      <select {...register("status")}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="bio">Bio</label>
                      <input
                        type="text"
                        name="bio"
                        id="bio"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Your bio...."
                        {...register("bio", {
                          maxLength: 140,
                          message: "maximum 140 character in bio",
                        })}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="funFact">Fun fact</label>
                      <input
                        type="text"
                        name="funFact"
                        id="funFact"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Fun fact about you..."
                        {...register("funFact", {
                          maxLength: {
                            value: 40,
                            message: "max length is 40",
                          },
                        })}
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
