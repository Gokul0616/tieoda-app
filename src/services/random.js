import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const savePost = async (media, path) => {
  try {
    const fileRef = ref(storage, path);
    const response = await fetch(media);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const snapshot = await uploadBytes(fileRef, blob);
    const downloadUrl = await getDownloadURL(snapshot.ref);

    return downloadUrl;
  } catch (error) {
    console.error("Error saving post:", error);
    throw error;
  }
};
