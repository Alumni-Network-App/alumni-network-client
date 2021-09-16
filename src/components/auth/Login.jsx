import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  signInWithGoogle,
  auth,
  signInWithEmailAndPassword,
} from "../../firebase";
import LoginImage from "../../assets/login_1.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <> Error: {error} </>;
    }
    if (user) history.replace("/dashboard");
  }, [user, history, error, loading]);

  const handleLoginWithEmailAndPassword = () => {
    if (!email || !password)
      return alert("Please provide valid email and password");
    signInWithEmailAndPassword(email, password);
  };
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
          <div className="self-start hidden lg:flex flex-col  text-black">
            <h1 className="mb-3 font-bold text-5xl">
              Hi 👋 Welcome Back to Alumni-Network
            </h1>
            <p className="pr-3">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 mt-7 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Login to you account</p>
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
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="mb-5 text-sm font-medium text-gray-700 tracking-wide"
                >
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <span className="text-green-400 hover:text-green-500">
                    <Link to="/reset"> Forgot your password? </Link>
                  </span>
                </div>
              </div>
              <div>
                <button
                  onClick={handleLoginWithEmailAndPassword}
                  type="submit"
                  className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
                >
                  Sign in
                </button>
              </div>
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs"></div>
            <div></div>
            <div className="flex space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">
              <img
                className=" h-5 cursor-pointer"
                src="https://i.imgur.com/arC60SB.png"
                alt=""
              />
              <button onClick={signInWithGoogle}>Sign-in with Google</button>
            </div>

            <p className="mt-8">
              Dont have an account?
              <span className="cursor-pointer text-sm text-blue-600">
                <Link to="/register"> Join free today </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
