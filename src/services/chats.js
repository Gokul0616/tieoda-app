import { auth, firestore } from "../../firebaseConfig";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore";

export const chatsListener = (listener) => {
  const chatsQuery = query(
    collection(firestore, "chats"),
    where("members", "array-contains", auth.currentUser.uid),
    orderBy("lastUpdate", "desc")
  );
  return onSnapshot(chatsQuery, listener);
};

export const messagesListener = (listener, chatId) => {
  const messagesQuery = query(
    collection(firestore, "chats", chatId, "messages"),
    orderBy("creation", "desc")
  );
  return onSnapshot(messagesQuery, listener);
};

export const sendMessage = async (chatId, message) => {
  const chatDocRef = doc(firestore, "chats", chatId);
  const messagesCollectionRef = collection(chatDocRef, "messages");

  await addDoc(messagesCollectionRef, {
    creator: auth.currentUser.uid,
    message,
    creation: serverTimestamp(),
  });

  await updateDoc(chatDocRef, {
    lastUpdate: serverTimestamp(),
    lastMessage: message,
  });
};

export const createChat = async (contactId) => {
  try {
    const chatDocRef = await addDoc(collection(firestore, "chats"), {
      lastUpdate: serverTimestamp(),
      lastMessage: "Send a first message",
      members: [contactId, auth.currentUser.uid],
    });
    return chatDocRef;
  } catch (error) {
    throw new Error("Error creating chat: " + error.message);
  }
};
