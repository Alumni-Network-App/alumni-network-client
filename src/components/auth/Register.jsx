import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) return alert("Please enter your name..");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      return <> Error: {error} </>;
    }
    if (user) {
      history.replace("/dashboard");
      //service.createUser(user.uid, name, user.photoURL);
    }
  }, [user, loading, error, history, name]);
  return (
    <section className="register">
      <div className="register__container">
        <input
          type="text"
          placeholder="Your name.."
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your email.."
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Your password.."
          className="register__textBox"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={register} className="register__btn">
          Register
        </button>
        <button
          onClick={signInWithGoogle}
          className="register__btn register__google"
        >
          Register with Google
        </button>
        <>
          Already have an account? <Link to="/">Login now</Link>
        </>
      </div>
    </section>
  );
};

export default Register;
