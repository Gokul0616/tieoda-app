import { auth, firestore } from "../../firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  increment,
  updateDoc,
  runTransaction,
  onSnapshot,
  addDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
let commentListenerInstance = null;

export const getFeed = (callback) => {
  try {
    const postsRef = collection(firestore, "posts");
    const unsubscribe = onSnapshot(postsRef, (querySnapshot) => {
      if (querySnapshot.empty) {
        callback([]);
      } else {
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(posts);
      }
    });
    return unsubscribe;
  } catch (error) {
    console.error("Error in Fetching Feeds", error);
    throw error;
  }
};

export const getPostByUserId = async (uid = auth.currentUser.uid) => {
  try {
    const postsRef = collection(firestore, "posts");
    const q = query(
      postsRef,
      where("creator", "==", uid),
      orderBy("creation", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting posts by user:", error);
    throw error;
  }
};
export const getLikesById = async (postId, uid) => {
  try {
    const likeDocRef = doc(firestore, "posts", postId, "likes", uid);
    const likeDoc = await getDoc(likeDocRef);
    return likeDoc.exists();
  } catch (error) {
    console.error("Error getting likes by id:", error);
    throw error;
  }
};

export const updateLike = async (postId, uid, currentLikeState) => {
  try {
    const postRef = doc(firestore, "posts", postId);
    const likeDocRef = doc(firestore, "posts", postId, "likes", uid);

    if (currentLikeState) {
      // If the post is currently liked, remove the like and decrement the likesCount
      await runTransaction(firestore, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) {
          throw new Error("Post does not exist!");
        }

        transaction.delete(likeDocRef);
        transaction.update(postRef, {
          likesCount: increment(-1),
        });
      });
    } else {
      // If the post is not currently liked, add the like and increment the likesCount
      await runTransaction(firestore, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) {
          throw new Error("Post does not exist!");
        }

        transaction.set(likeDocRef, {});
        transaction.update(postRef, {
          likesCount: increment(1),
        });
      });
    }
  } catch (error) {
    console.error("Error updating like:", error);
    throw error;
  }
};

export const addComment = async (postId, creator, comment) => {
  try {
    // Add comment to the comments collection
    const commentsRef = collection(firestore, `posts/${postId}/comments`);
    await addDoc(commentsRef, {
      creator,
      comment,
      creation: serverTimestamp(),
    });

    // Query comments collection for the specific post to get the updated comments count
    const postCommentsRef = collection(firestore, `posts/${postId}/comments`);
    const commentsSnapshot = await getDocs(postCommentsRef);
    const commentsCount = commentsSnapshot.size;
    const postRef = doc(firestore, "posts", postId);
    await updateDoc(postRef, {
      commentsCount,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const commentListener = (postId, setCommentList) => {
  try {
    const commentsRef = collection(firestore, `posts/${postId}/comments`);
    const orderedCommentsQuery = query(
      commentsRef,
      orderBy("creation", "desc")
    );
    const commentListenerInstance = onSnapshot(
      orderedCommentsQuery,
      (snapshot) => {
        const comments = [];
        snapshot.forEach((doc) => {
          comments.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCommentList(comments);
      },
      (error) => {
        console.error("Error fetching comments:", error);
      }
    );

    return commentListenerInstance; // Return the unsubscribe function for cleanup
  } catch (error) {
    console.error("Error setting up comment listener:", error);
    throw error; // Re-throw the error for handling at a higher level
  }
};

export const clearCommentListener = () => {
  try {
    if (commentListenerInstance) {
      commentListenerInstance();
      commentListenerInstance = null;
    }
  } catch (error) {
    console.error("Error clearing comment listener:", error);
    throw error;
  }
};
