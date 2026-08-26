import {
  getInviteByToken,
  acceptInvite,
} from "@/modules/workspace/actions/invite";
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/current-user";
import { Button } from "@/components/ui/button";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const invite = await getInviteByToken(token);
  const user = await currentUser();

  if (!invite) {
    return <div className="p-10 text-center">Invite not found.</div>;
  }

  if (invite.expired) {
    return <div className="p-10 text-center">This invite has expired.</div>;
  }

  if (!user) {
    // send them to sign-in, then bounce back here after
    redirect(`/sign-in?callbackURL=/invite/${token}`);
  }

  async function handleAccept() {
    "use server";
    const workspaceId = await acceptInvite(token);
    redirect(`/workspace?joined=${workspaceId}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form action={handleAccept} className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Join {invite.workspace.name}</h1>
        <p className="text-muted-foreground">
          {invite.invitedBy.name} invited you as {invite.role.toLowerCase()}
        </p>
        <Button type="submit">Accept invite</Button>
      </form>
    </div>
  );
}
