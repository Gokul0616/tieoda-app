import { auth, firestore } from "../../firebaseConfig";
import { savePost } from "./random";
import { updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
  Firestore,
} from "firebase/firestore";
export const saveUserProfileImage = async (image) => {
  try {
    const url = await savePost(image, `profileImage/${auth.currentUser.uid}`);

    // Update user profile in Firebase Authentication
    await updateProfile(auth.currentUser, { photoURL: url });

    // Update user profile URL in Firestore
    const userRef = doc(firestore, "user", auth.currentUser.uid);
    await updateDoc(userRef, { photoURL: url });
    return url;
  } catch (error) {
    console.error("Error saving user profile image:", error);
    throw error;
  }
};
export const saveUserField = async (field, value) => {
  try {
    // console.log(field, value);
    let obj = {};
    obj[field] = value;

    const userRef = doc(firestore, "user", auth.currentUser.uid); // Corrected the collection name to "users"
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      await updateDoc(userRef, obj);
      console.log(`Successfully updated user field: ${field}`);
    } else {
      // If the document doesn't exist, create it with the field
      await setDoc(userRef, obj);
      console.log(`Successfully created and updated user field: ${field}`);
    }
  } catch (error) {
    console.error(`Error saving user field ${field}:`, error);
    throw error;
  }
};

export const queryUserByEmail = async (email) => {
  try {
    if (!email || email === "") {
      return [];
    }

    const usersRef = collection(firestore, "user");
    const q = query(
      usersRef,
      where("email", ">=", email.toLowerCase()),
      where("email", "<=", email.toLowerCase() + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    } else {
      let users = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      return users;
    }
  } catch (error) {
    console.error("Error querying user by email:", error);
    throw error;
  }
};
export const getUserById = async (id) => {
  try {
    const userRef = doc(firestore, "user", id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return { ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
};

// Check if Following
export const getIsFollowing = async (userId, otherUserId) => {
  try {
    if (!userId || !otherUserId) {
      throw new Error("Invalid userId or otherUserId");
    }
    const userRef = doc(firestore, "user", userId, "following", otherUserId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists();
  } catch (error) {
    console.error("Error checking following state", error);
    throw error;
  }
};
export const changeFollowState = async ({
  userId,
  otherUserId,
  isFollowing,
}) => {
  try {
    const userRef = doc(firestore, "user", userId, "following", otherUserId);

    if (isFollowing) {
      await deleteDoc(userRef);
      return { message: "unfollowed", newFollowState: false };
    } else {
      await setDoc(userRef, {});
      return { message: "followed", newFollowState: true };
    }
  } catch (error) {
    console.error("Error changing follow state:", error);
    throw error;
  }
};
