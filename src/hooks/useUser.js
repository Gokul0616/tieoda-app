import { useQuery } from "react-query";
import { USER_KEY, keys } from "./queryKeys";
import { getUserById } from "../services/user";

export const useUser = (userId, options = {}) => {
  return useQuery(keys.user(userId), () => getUserById(userId), options);
};
