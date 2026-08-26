import { currentUser } from "@/modules/authentication/actions";
import Header from "@/modules/layout/components/header";
import { initializeWorkspace } from "@/modules/workspace/actions";
import TabbedLeftPanel from "@/modules/workspace/components/tabbed-left-panel";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await initializeWorkspace();
  const user = await currentUser();

  if (!result.success || !result.workspace) {
    return (
      <div className="p-10 text-center text-red-500">
        {result.error ?? "Failed to load workspace."}
      </div>
    );
  }

  const { workspace } = result;

  return (
    <>
      {/*Header*/}
      <Header user={user} workspaceId={workspace.id} />
      <main className="max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden">
        <div className="flex h-full w-full">
          <TabbedLeftPanel />
          <div className="flex-1 bg-zinc-900">{children}</div>
        </div>
      </main>
    </>
  );
};

export default RootLayout;
