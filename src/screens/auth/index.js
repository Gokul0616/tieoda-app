import { View } from "react-native";
import AuthMenu from "../../components/auth/menu";
import { useState } from "react";
import AuthDetails from "../../components/auth/details";
import styles from "./styles";
const AuthScreen = () => {
  const [authpage, setAuthPage] = useState(0);
  const [detailsPage, setDetailsPage] = useState(false);
  return (
    <View style={styles.container}>
      {detailsPage ? (
        <AuthDetails authpage={authpage} setDetailsPage={setDetailsPage} />
      ) : (
        <AuthMenu
          authpage={authpage}
          setAuthPage={setAuthPage}
          detailsPage={detailsPage}
          setDetailsPage={setDetailsPage}
        />
      )}
    </View>
  );
};
export default AuthScreen;
