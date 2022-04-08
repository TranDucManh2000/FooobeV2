import app from "../firebase/FirebaseConfig";
import { getAuth,signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Clearcart, PostInUser } from "../redux/Reduce";

const LoginOut = () => {
    const dispatch = useDispatch();
    const out = () => {
        const auth = getAuth(app);
        signOut(auth)
          .then(() => {
            console.log("Logout");
            dispatch(PostInUser(""));
            dispatch(Clearcart([]));
            localStorage.setItem('user',0);
          })
          .catch((error) => {
            console.log("error", error);
          });
      };
  return out;
}

export default LoginOut