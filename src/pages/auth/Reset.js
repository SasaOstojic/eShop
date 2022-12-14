import { React, useState } from "react";
import resetImg from "../../assets/forgot.png";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [loading, isLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();

    isLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        isLoading(false);
        toast.success("Password reseted! Please check your e-mail...");
      })
      .catch((error) => {
        isLoading(false);
        toast.error("Password was not reset.");
      });
  };
  return (
    <>
    {loading &&  <Loader/>}
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt="Reset" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset password</h2>

          <form onSubmit={resetPassword}>
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="login">Login</Link>
              </p>
              <p>
                <Link to="register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </section>
    </>
  );
};

export default Reset;
