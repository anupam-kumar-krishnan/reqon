"use server";

import db from "@/lib/db";
import { currentUser } from "@/lib/current-user"; // adjust to your actual auth helper
import { MEMBER_ROLE } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createInvite = async (
  workspaceId: string,
  role: MEMBER_ROLE = "EDITOR",
) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  // confirm requester is a member of this workspace (basic authorization check)
  const membership = await db.workspaceMember.findUnique({
    where: { userId_workspaceId: { userId: user.id, workspaceId } },
  });
  if (!membership) throw new Error("Not a member of this workspace");

  const invite = await db.invitation.create({
    data: {
      workspaceId,
      invitedById: user.id,
      role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  });

  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${invite.token}`;
  return { inviteUrl, expiresAt: invite.expiresAt };
};

export const getInviteByToken = async (token: string) => {
  const invite = await db.invitation.findUnique({
    where: { token },
    include: { workspace: true, invitedBy: true },
  });

  if (!invite) return null;
  if (invite.status !== "PENDING") return { ...invite, expired: true };
  if (invite.expiresAt < new Date()) return { ...invite, expired: true };

  return { ...invite, expired: false };
};

export const acceptInvite = async (token: string) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const invite = await db.invitation.findUnique({ where: { token } });
  if (!invite) throw new Error("Invite not found");
  if (invite.status !== "PENDING") throw new Error("Invite already used");
  if (invite.expiresAt < new Date()) throw new Error("Invite expired");

  await db.workspaceMember.upsert({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId: invite.workspaceId,
      },
    },
    create: {
      userId: user.id,
      workspaceId: invite.workspaceId,
      role: invite.role,
    },
    update: {},
  });

  await db.invitation.update({
    where: { token },
    data: { status: "ACCEPTED" },
  });

  revalidatePath("/workspace");
  return invite.workspaceId; // return it, don't redirect here
};

export const getWorkspaceMembers = async (workspaceId: string) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const members = await db.workspaceMember.findMany({
    where: { workspaceId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return members;
};
