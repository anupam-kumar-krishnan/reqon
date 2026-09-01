"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Copy, Check, Loader2 } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInvite } from "@/modules/workspace/actions/invite";
import { MEMBER_ROLE } from "@prisma/client";
import { useWorkspaceStore } from "../store"; // adjust path to match your project

const InviteMember = () => {
  const { selectedWorkspace } = useWorkspaceStore();

  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<MEMBER_ROLE>("EDITOR");
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    if (!selectedWorkspace) return;

    startTransition(async () => {
      const { inviteUrl } = await createInvite(selectedWorkspace.id, role);
      setInviteUrl(inviteUrl);
      setCopied(false);
    });
  };

  const handleCopy = async () => {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setInviteUrl(null);
          setCopied(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <div>
          <Hint label="Invite Members">
            <Button
              disabled={!selectedWorkspace}
              className="border border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300"
            >
              <UserPlus className="size-4 text-emerald-400" />
            </Button>
          </Hint>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite to {selectedWorkspace?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Role</label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as MEMBER_ROLE)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="VIEWER">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!inviteUrl ? (
            <Button
              onClick={handleGenerate}
              disabled={isPending || !selectedWorkspace}
              className="w-full"
            >
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Generate invite link
            </Button>
          ) : (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Share this link - expires in 7 days
              </label>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={inviteUrl}
                  className="flex-1 rounded-md border bg-muted px-3 py-2 text-xs"
                  onFocus={(e) => e.target.select()}
                />
                <Button size="icon" variant="outline" onClick={handleCopy}>
                  {copied ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMember;
