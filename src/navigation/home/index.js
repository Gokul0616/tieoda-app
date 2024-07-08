import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Image } from "react-native";
import CameraScreen from "../../screens/camera";
import ProfileScreen from "../../screens/profile";
import { auth } from "../../../firebaseConfig";
import SearchScreen from "../../screens/search";
import FeedScreen from "../../screens/feeds";
// import FeedScreen from "../../screens/feeds";
import FeedNavigation from "../feed";
import ChatScreen from "../../screens/chat/list";
import { useChats } from "../../hooks/useChat";
const Tab = createBottomTabNavigator();
export default function HomeScreen() {
  useChats();
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: "#000" }}
      initialRouteName="feed"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderColor: "#333",
          height: 60,
        }, // Set dark black color here
      }}
    >
      <Tab.Screen
        name="feed"
        component={FeedNavigation}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/home/home.png")}
              style={{
                height: 24,
                tintColor: focused ? "#FF375F" : "#EBEBF5",
                width: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/home/search.png")}
              style={{
                height: 24,
                tintColor: focused ? "#FF375F" : "#EBEBF5",
                width: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="add"
        component={CameraScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/home/plus.png")}
              style={{
                height: 24,
                width: 24,
                tintColor: focused ? "#FF375F" : "#EBEBF5",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="inbox"
        component={ChatScreen}
        options={{
          tabBarLabel: "Activity",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/home/activity.png")}
              style={{
                height: 24,
                tintColor: focused ? "#FF375F" : "#EBEBF5",
                width: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileScreen}
        initialParams={{ initialUserId: auth.currentUser.uid }}
        options={{
          tabBarLabel: "Me",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/home/user.png")}
              style={{
                height: 24,
                tintColor: focused ? "#FF375F" : "#EBEBF5",
                width: 24,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
