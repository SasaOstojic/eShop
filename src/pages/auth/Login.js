import { React, useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../firebase/config";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {selectPreviousUrl} from '../../redux/slice/cartSlice'
import provider from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, isLoading] = useState(false);
  const previuosUrl = useSelector(selectPreviousUrl);

  const navigate = useNavigate();

  const redirectUser = () => {
    if(previuosUrl.includes('cart')){
      return navigate('/cart')
    }else {
      navigate('/')
    }
  }

  const loginUser = (e) => {
    e.preventDefault();

    isLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        isLoading(false);
        toast.success("Login successful");
        redirectUser();
      })
      .catch((error) => {
        isLoading(false);
        toast.error(error.message);
      });
  };


  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {

        toast.success("Login successful!");
        redirectUser();
      })
      .catch((error) => {
        toast.error("Login failed!");
      });
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>

            <form onSubmit={loginUser}>
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
              <button className="--btn --btn-primary --btn-block">Login</button>
              <div className={styles.links}>
                <Link to="/reset">Reset password</Link>
              </div>
              <p> -- or --</p>
            </form>
            <button
              type="submit"
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" />
              Login with google
            </button>
            <span className={styles.register}>
              <p>Don't have an account</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
