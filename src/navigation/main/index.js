import { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userAuthStateListener } from "../../redux/actions/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../../screens/auth";
import HomeScreen from "../home";
import SavePostScreen from "../../screens/savePost";
import EditProfileScreen from "../../screens/profile/editProfile";
import EditProfileFieldScreen from "../../screens/profile/editProfile/field";
import ProfileScreen from "../../screens/profile";
import Modal from "../../components/modal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import FeedScreen from "../../screens/feeds";
import ChatSingleScreen from "../../screens/chat/single";
const Stack = createNativeStackNavigator();
export default function Route() {
  const currentUserObj = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAuthStateListener());
  }, []);
  if (!currentUserObj.loaded) {
    return <View></View>;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#000"
          hidden={false}
          translucent={true}
        />
        <NavigationContainer>
          <Stack.Navigator>
            {currentUserObj.currentUser == null ? (
              <Stack.Screen
                name="auth"
                component={AuthScreen}
                options={{ headerShown: false }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="home"
                  component={HomeScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="savePost"
                  component={SavePostScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="userPost"
                  component={FeedScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="profileOther"
                  component={ProfileScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="chatSingle"
                  component={ChatSingleScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="editProfile"
                  component={EditProfileScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="editProfilefield"
                  component={EditProfileFieldScreen}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
          <Modal />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
