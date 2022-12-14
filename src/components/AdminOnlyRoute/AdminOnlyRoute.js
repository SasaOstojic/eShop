import { useSelector } from "react-redux";
import { selectEmail } from "../../redux/slice/authSlice";
import { Link } from "react-router-dom";

const AdminOnlyRoute = ({children}) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "sasaostojicjea@gmail.com") {
    return children;
  }
  return (
    <section style={{height: '80vh'}}>
      <h2>Permission denied !</h2>
      <p>Sorry! This page can only be viewed by an Admin site user.</p>
      <Link to="/">
        <button className="--btn"> &larr; Back to home</button>
      </Link>
    </section>
  );
};

export const AdminOnlyLink = ({children}) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === "sasaostojicjea@gmail.com") {
    return children;
  }
  return null;
};

export default AdminOnlyRoute;
