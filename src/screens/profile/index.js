import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styles from "./styles";
import ProfileNavBar from "../../components/profille/navbar";
import ProfileHeader from "../../components/profille/header";
import ProfilePostList from "../../components/profille/postList";
import { CurrentUserProfileItemInViewContext } from "../../navigation/feed";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { getPostByUserId } from "../../services/posts";
export default function ProfileScreen({ route }) {
  const { initialUserId } = route.params;
  const [userPosts, setUserPosts] = useState([]);
  let providerUserId = null;
  if (CurrentUserProfileItemInViewContext != null) {
    providerUserId = useContext(CurrentUserProfileItemInViewContext);
  }
  const user = useUser(initialUserId ? initialUserId : providerUserId).data;

  useEffect(() => {
    if (user === undefined) {
      return;
    }
    getPostByUserId(user.uid).then(setUserPosts);
  }, [user]);
  if (user === undefined) {
    return <></>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={user} />
      <ProfileHeader user={user} />
      <ProfilePostList posts={userPosts} />
    </SafeAreaView>
  );
}
