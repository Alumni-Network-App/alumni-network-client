import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory, Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../firebase";
import "./Reset.css";

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
    <section className="reset">
      <div className="reset__container">
        <input
          type="text"
          placeholder="Your email here..."
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={() => sendPasswordResetEmail(email)}
          className="reset__btn"
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
          <br />
          Go back to <Link to="/">Login</Link> page.
        </div>
      </div>
    </section>
  );
};

export default Reset;
