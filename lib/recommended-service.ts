import { getSelf } from "./auth-service";
import { db } from "@/lib/db";

export const getRecommended = async () => {
  // const user = await getSelf();
  const recommendedUsers = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return recommendedUsers;
};
