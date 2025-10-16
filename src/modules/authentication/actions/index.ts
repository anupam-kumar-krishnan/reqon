"use server";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { headers } from "next/headers";

export const currentUser = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user || !session.user.id) {
      return null;
    }

    const userId = session.user.id;

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.log("Error fetching current user: ", error);

    return null;
  }
};
