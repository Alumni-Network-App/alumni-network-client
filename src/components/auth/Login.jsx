import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import "./Login.css";

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
    <section className="login">
      <div className="login__container">
        <input
          className="login__textBox"
          type="text"
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="login__textBox"
          type="password"
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          onClick={handleLoginWithEmailAndPassword}
          className="login__btn"
        >
          Login
        </button>
        <button onClick={signInWithGoogle} className="login__btn login__google">
          Login with Google
        </button>
        <div>
          <Link to="/reset"> Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="register">Register</Link> now.
        </div>
      </div>
    </section>
  );
};

export default Login;
