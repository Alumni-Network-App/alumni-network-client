import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../firebase";
import LoginImage from "../../assets/login_1.svg";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <> Error: {error} </>;
    }
    if (user) history.replace("/dashboard");
  }, [user, loading, history, error]);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${LoginImage})`,
      }}
    >
      <div className="absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">
                Reset your Password
              </h3>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 tracking-wide"
                >
                  Email
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="mail@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button
                  onClick={() => sendPasswordResetEmail(email)}
                  type="submit"
                  className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
                >
                  Send password reset email
                </button>
              </div>

              <div>
                Don't have an account?
                <span className="text-normal text-blue-700 hover:underline cursor-pointer">
                  <Link to="/register">Register </Link>
                </span>
                now. <br />
                Go back to
                <span className="text-normal text-blue-700 hover:underline cursor-pointer">
                  <Link to="/"> Login </Link>
                </span>
                page.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
