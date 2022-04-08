import app from "../firebase/FirebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { GetDataProfile, PostInUser } from "../redux/Reduce";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const LoginGoogle = () => {
  // firebase login
  const dispatch = useDispatch();
  const db = getFirestore();
  const Google = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async(result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log("data user", user);
        // tu tuc
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            pass: user.uid,
            img: user.photoURL,
            uid: user.uid,
          })
        );
        dispatch(PostInUser(user));
        // tao profile
        const docRef = doc(db, "profile",user.uid);
        const docSnapprofile = await getDoc(docRef);
        // console.log('check',docSnapprofile);
        if (docSnapprofile._document == null) {
          console.log('bi set');
          setDoc(docRef, {
            name : user.email,
            address : 'null',
            phone  : 'null',
          });
        }

      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return Google;
};

export default LoginGoogle;
