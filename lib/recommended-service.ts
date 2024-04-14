import { getSelf } from "./auth-service";
import { db } from "@/lib/db";

export const getRecommended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch (e) {
    userId = null;
  }

  let recommendedUsers = [];

  if (userId) {
    recommendedUsers = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    recommendedUsers = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return recommendedUsers;
};
