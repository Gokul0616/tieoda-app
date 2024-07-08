import { auth, firestore } from "../../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  on,
  onSnapshot,
} from "firebase/firestore";
import { USER_STATE_CHANGE } from "../constants";
import { getPostByUser } from "./post";

export const login = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
    return user;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error.message });
    throw error;
  }
};
export const userAuthStateListener = () => (dispatch) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentUserData());
        dispatch(getPostByUser(auth.currentUser.uid));
      } else {
        dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const generateUniqueUsername = async () => {
  let isUnique = false;
  let username = "";
  while (!isUnique) {
    const randomNum = Math.floor(Math.random() * 1000000);
    username = `user${randomNum}`;
    const userDoc = await getDoc(doc(firestore, "usernames", username));
    if (!userDoc.exists()) {
      isUnique = true;
    }
  }
  return username;
};

export const register = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const username = await generateUniqueUsername();
    const userData = {
      username: username,
      ...JSON.parse(JSON.stringify(user)),
    };

    await setDoc(doc(firestore, "user", user.uid), userData);

    await setDoc(doc(firestore, "usernames", username), { uid: user.uid });

    // Dispatch success action
    const action = { type: "REGISTER_SUCCESS", payload: user };
    dispatch(action);
    return action;
  } catch (error) {
    console.error("Registration failed:", error.code, error.message);
    dispatch({ type: "REGISTER_FAILURE", payload: error.message });
    throw error;
  }
};
// export const register = (email, password) => async (dispatch) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(
//       auth,
//       email,
//       password
//     );
//     const user = userCredential.user;
//     let obj = {};
//     obj["email"] = email;
//     await setDoc(
//       doc(firestore, "user", user.uid),
//       JSON.parse(JSON.stringify(user))
//     );
//     const action = { type: "REGISTER_SUCCESS", payload: user };
//     dispatch(action);
//     return action;
//   } catch (error) {
//     console.error("Registration failed:", error.code, error.message);
//     dispatch({ type: "REGISTER_FAILURE", payload: error.message });
//     throw error;
//   }
// };

export const getCurrentUserData = () => async (dispatch) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(firestore, "user", user.uid);
      const unsubscribe = onSnapshot(userRef, (userSnapshot) => {
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: userData,
            loaded: true,
          });
        } else {
          dispatch({
            type: "GET_CURRENT_USER_DATA_FAILURE",
            payload: "User data not found",
          });
        }
      });

      // Return the unsubscribe function to clean up the listener when needed
      return unsubscribe;
    } else {
      dispatch({
        type: "GET_CURRENT_USER_DATA_FAILURE",
        payload: "No authenticated user",
      });
    }
  } catch (error) {
    console.error("Error getting current user data:", error);
    dispatch({ type: "GET_CURRENT_USER_DATA_FAILURE", payload: error.message });
  }
};
