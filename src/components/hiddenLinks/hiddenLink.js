
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/slice/authSlice'

const ShowOnLogin = ({children}) => {

    //Taking isLoggedIn variable from redux store
    const isLoggedIn = useSelector(selectIsLoggedIn);

  if(isLoggedIn) {
    return children;
  }else {
    return null;
  }
}

//We can have ony one default export at page so we export this as regular
export const ShowOnLogout = ({children}) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

  if(!isLoggedIn) {
    return children;
  }else {
    return null;
  }

}

export default ShowOnLogin;