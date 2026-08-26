"use client";

import { useWorkspaceMembers } from "@/modules/workspace/hooks/members";
import { Loader } from "lucide-react";

interface MembersPanelProps {
  workspaceId: string;
}

const roleColors: Record<string, string> = {
  ADMIN: "text-emerald-400 bg-emerald-400/10 border-emerald-400/25",
  EDITOR: "text-indigo-400 bg-indigo-400/10 border-indigo-400/25",
  VIEWER: "text-zinc-400 bg-zinc-400/10 border-zinc-400/25",
};

const MembersPanel = ({ workspaceId }: MembersPanelProps) => {
  const { data: members, isLoading } = useWorkspaceMembers(workspaceId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Loader className="size-5 animate-spin text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="p-4 space-y-1">
      <h3 className="text-sm font-semibold text-zinc-300 mb-3 px-2">
        Members ({members?.length ?? 0})
      </h3>

      {members?.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between gap-2 px-2 py-2 rounded-md hover:bg-white/5"
        >
          <div className="flex items-center gap-2 min-w-0">
            {member.user.image ? (
              <img
                src={member.user.image}
                alt={member.user.name}
                className="size-7 rounded-full shrink-0"
              />
            ) : (
              <div className="size-7 rounded-full bg-indigo-400/20 flex items-center justify-center text-xs font-semibold text-indigo-300 shrink-0">
                {member.user.name?.[0]?.toUpperCase() ?? "?"}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm text-zinc-200 truncate">
                {member.user.name}
              </p>
              <p className="text-xs text-zinc-500 truncate">
                {member.user.email}
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${
              roleColors[member.role] ?? roleColors.VIEWER
            }`}
          >
            {member.role}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MembersPanel;
