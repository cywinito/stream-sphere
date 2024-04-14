"use server";
import { revalidatePath } from "next/cache";
import { followUser, unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    revalidatePath("/");
    if (followedUser) {
      revalidatePath(`/users/${followedUser.following.username}`);
    }
    return followedUser;
  } catch (e) {
    throw new Error("Internal error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);
    revalidatePath("/");
    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }
    return unfollowedUser;
  } catch (e) {
    throw new Error("Internal error");
  }
};
