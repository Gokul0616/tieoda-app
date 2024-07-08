import { useQuery } from "react-query";
import { USER_KEY, keys } from "./queryKeys";
import { getIsFollowing, getUserById } from "../services/user";

export const useFollowing = (userId, otherUserId, options = {}) => {
  return useQuery(
    keys.userFollowing(userId, otherUserId),
    () => getIsFollowing(userId, otherUserId),
    options
  );
};
