import { useQuery } from "@tanstack/react-query";
import { getWorkspaceMembers } from "../actions/invite";

export const useWorkspaceMembers = (workspaceId: string | undefined) => {
  return useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => getWorkspaceMembers(workspaceId as string),
    enabled: !!workspaceId,
  });
};
