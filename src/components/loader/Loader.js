import React from "react";
import loaderImg from "../../assets/loader.gif";
import styles from "./Loader.module.scss";
import  ReactDOM  from "react-dom";

const Loader = () => {
  // Importing ReactDOM to fix problems of implementing loader on whole page and attaching it to element we created in index.html
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;
