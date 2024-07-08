import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chatsListener } from "../services/chats";
import { setChats } from "../redux/actions/chats";
export const useChats = () => {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.auth.currentUser);
  const handleChatsChange = useCallback(
    (change) => {
      dispatch(
        setChats(change.docs.map((item) => ({ id: item.id, ...item.data() })))
      );
    },
    [dispatch]
  );

  useEffect(() => {
    let listenerinstance;
    if (currentuser != null) {
      listenerinstance = chatsListener(handleChatsChange);
    }
    return () => {
      listenerinstance && listenerinstance();
    };
  }, [currentuser]);
};
