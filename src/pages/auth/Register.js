import { React, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [loading, isLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      //Object from the toast library to get popur error handle if passwords do not match
      toast.error("Passwords do not match");
    }

    isLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        isLoading(false);
        toast.success("You are successfully registrated!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        isLoading(false);
      });
  };

  return (
    <>
      {/* Wrapping with Toast container to get effect of right popup on the page when passwords are not matching */}
      {loading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confrm Password"
                required
                value={cPassword}
                onChange={(e) => setcPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p> Already have an account</p>
              <Link to="/login"> Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Login" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;
