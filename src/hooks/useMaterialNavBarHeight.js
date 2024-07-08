import { useSafeAreaInsets } from "react-native-safe-area-context";

const useMaterialNavBarHeight = (withoutBottomTabs) => {
  const { bottom, top } = useSafeAreaInsets();
  return withoutBottomTabs ? 0 : 54;
};
export default useMaterialNavBarHeight;
 