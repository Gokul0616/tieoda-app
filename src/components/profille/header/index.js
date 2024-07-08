import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import buttonStyles from "../../../styles/buttonStyles";
import { auth } from "../../../../firebaseConfig";
import { useFollowing } from "../../../hooks/useFollowing";
import { useFollowingMutation } from "../../../hooks/useFollowingMutation";

const ProfileHeader = ({ user }) => {
  const userProfileImage = user?.photoURL ? user?.photoURL : null;
  const navigation = useNavigation();
  const userId = auth.currentUser?.uid;
  const otherUserId = user?.uid;

  const { data: isFollowing } = useFollowing(userId, otherUserId);
  const followingMutation = useFollowingMutation();
  const handleFollowToggle = () => {
    if (userId && otherUserId !== undefined) {
      followingMutation.mutate({
        userId,
        otherUserId,
        isFollowing,
      });
    } else {
      console.error("Invalid userId or otherUserId");
    }
  };
  const renderFollowButton = () => {
    if (isFollowing) {
      return (
        <View style={styles.followContainer}>
          <TouchableOpacity
            style={buttonStyles.grayOutlinedButton}
            onPress={() =>
              navigation.navigate("chatSingle", {
                contactId: user.uid,
                userData: user,
              })
            }
          >
            <Text style={buttonStyles.grayOutlinedButtonText}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyles.grayOutlinedIconButton}
            onPress={handleFollowToggle}
          >
            <Feather name="user-check" size={20} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={buttonStyles.filledButton}
          onPress={handleFollowToggle}
        >
          <Text style={buttonStyles.filledButtonText}>Follow</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {userProfileImage ? (
        <View style={styles.userProfileImageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: userProfileImage,
            }}
          />
        </View>
      ) : (
        <Avatar.Icon
          size={100}
          icon={"account"}
          style={{ backgroundColor: "lightgray" }}
        />
      )}
      <Text style={styles.emailText}>
        {user?.displayName ? user?.displayName : user?.username}
      </Text>
      <View style={styles.counterContainer}>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Following</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Followers</Text>
        </View>
        <View style={styles.counterItemContainer}>
          <Text style={styles.counterNumberText}>0</Text>
          <Text style={styles.counterLabelText}>Likes</Text>
        </View>
      </View>
      {userId === user.uid ? (
        <TouchableOpacity
          style={buttonStyles.grayOutlinedButton}
          onPress={() => navigation.navigate("editProfile")}
        >
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      ) : (
        renderFollowButton()
      )}
    </View>
  );
};

export default ProfileHeader;
