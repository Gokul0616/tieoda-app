import { auth, firestore } from "../../../firebaseConfig";
import { CURRENT_USER_POSTS_UPDATE } from "../constants";
import { savePost } from "../../services/random";
import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  where,
  getDocs,
} from "firebase/firestore";
import uuid from "uuid-random";

export const createPost =
  (description, video, thumbnail) => async (dispatch) => {
    try {
      const storagePost = uuid();
      const videoURL = await savePost(
        video,
        `post/${auth.currentUser.uid}/${storagePost}/video`
      );
      const thumbnailURL = await savePost(
        thumbnail,
        `post/${auth.currentUser.uid}/${storagePost}/thumbnail`
      );

      const postRef = doc(firestore, "posts", storagePost); // Use a new UUID for the document ID
      const postData = {
        creator: auth.currentUser.uid,
        videoURL: videoURL,
        thumbnailURL: thumbnailURL,
        description: description,
        likesCount: 0,
        commentsCount: 0,
        creation: serverTimestamp(),
      };

      await setDoc(postRef, postData);
      dispatch({ type: "CREATE_POST_SUCCESS", payload: postData });
    } catch (error) {
      console.error("Error creating post:", error);
      dispatch({ type: "CREATE_POST_FAILURE", payload: error.message });
      throw error;
    }
  };

export const getPostByUser =
  (uid = auth.currentUser.uid) =>
  async (dispatch) => {
    try {
      const postsRef = collection(firestore, "posts");
      const q = query(
        postsRef,
        where("creator", "==", uid),
        orderBy("creation", "desc")
      );
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch({ type: CURRENT_USER_POSTS_UPDATE, currentUserPosts: posts });
    } catch (error) {
      console.error("Error getting posts by user:", error);
      dispatch({ type: "GET_POSTS_BY_USER_FAILURE", payload: error.message });
      throw error;
    }
  };
