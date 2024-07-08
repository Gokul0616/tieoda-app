import { View, Text, FlatList } from "react-native";
import NavBarGeneral from "../../../components/general/navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatListItem from "../../../components/chat/list/item";
import { useSelector } from "react-redux";
const ChatScreen = () => {
  const chats = useSelector((state) => state.chat.list);
  const renderItem = ({ item }) => {
    return <ChatListItem chat={item} />;
  };
  return (
    <SafeAreaView>
      <NavBarGeneral leftButton={{ display: false }} title="Direct Messages" />
      <FlatList
        data={chats}
        removeClippedSubviews
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default ChatScreen;
