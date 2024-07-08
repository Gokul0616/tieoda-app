import { useMutation, useQuery, useQueryClient } from "react-query";
import { changeFollowState, getIsFollowing } from "../services/user";
import { keys } from "./queryKeys";
import { auth } from "../../firebaseConfig";

export const useFollowingMutation = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation(changeFollowState, {
    ...options,
    onMutate: async ({ userId, otherUserId, isFollowing }) => {
      await queryClient.cancelQueries(keys.userFollowing(userId, otherUserId));
      const previousIsFollowing = queryClient.getQueryData(
        keys.userFollowing(userId, otherUserId)
      );
      queryClient.setQueryData(
        keys.userFollowing(userId, otherUserId),
        !isFollowing
      );
      return { previousIsFollowing };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        keys.userFollowing(variables.userId, variables.otherUserId),
        context.previousIsFollowing
      );
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries(
        keys.userFollowing(variables.userId, variables.otherUserId)
      );
    },
  });
};
