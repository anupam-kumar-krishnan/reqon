import { create } from "zustand";
import { nanoid } from "nanoid";
import { StringToBoolean } from "class-variance-authority/types";
import { title } from "process";
import { methods } from "better-auth/react";

export type RequestTab = {
  id: string;
  title: string;
  method: string;
  url: string;
  body?: string;
  headers?: string;
  parameters?: string;
  unsavedChanges?: boolean;
  requestId?: string;
  collectionId?: string;
  workspaceId?: string;
};

interface SavedRequest {
  id: string;
  name: string;
  method: string;
  url: string;
  body?: string;
  headers?: string;
  parameters?: string;
}

type PlaygroundState = {
  tabs: RequestTab[];
  activeTabId: string | null;
  addTab: () => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, data: Partial<RequestTab>) => void;
  markUnsaved: (id: string, value: boolean) => void;
  openRequestTab: (req: any) => void;
  updateTabFromSavedRequest: (
    tabId: string,
    savedRequest: SavedRequest
  ) => void;
  // responsiveViewerData: ResponseData | null;
  // setResponsiveViewerData: (data: ResponseData) => void;
};

// @ts-ignore

export const useRequestPlayground = create<PlaygroundState>((set) => ({
  tabs: [],
  activeTabId: null,

  addTab: () =>
    set((state) => {
      const newTab: RequestTab = {
        id: nanoid(),
        title: "Untitled",
        method: "GET",
        url: "",
        body: "",
        headers: "",
        parameters: "",
        unsavedChanges: true,
      };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),

  closeTab: (id) =>
    set((state) => {
      const newTabs = state.tabs.filter((t) => t.id !== id);
      const newActive =
        state.activeTabId === id && newTabs.length > 0
          ? newTabs[0].id
          : state.activeTabId;
      return { tabs: newTabs, activeTabId: newActive };
    }),

  setActiveTab: (id) => set({ activeTabId: id }),

  updateTab: (id, data) =>
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === id ? { ...t, ...data, unsavedChanges: true } : t
      ),
    })),

  markUnsaved: (id, value) =>
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === id ? { ...t, unsavedChanges: value } : t
      ),
    })),

  openRequestTab: (req) =>
    set((state) => {
      const existing = state.tabs.find((t) => t.requestId === req.id);

      if (existing) {
        return { activeTabId: existing.id };
      }

      const newTab: RequestTab = {
        id: nanoid(),
        title: req.name || "Untitled",
        method: req.method,
        url: req.url,
        body: req.body,
        headers: req.headers,
        parameters: req.parameters,
        requestId: req.id,
        collectionId: req.collectionId,
        workspaceId: req.workspaceId,
        unsavedChanges: false,
      };

      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),

  updateTabFromSavedRequest: (tabId: string, savedRequest: SavedRequest) =>
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === tabId
          ? {
              ...t,
              id: savedRequest.id, // Replace temporary id with saced one
              title: savedRequest.name,
              method: savedRequest.method,
              body: savedRequest?.body,
              headers: savedRequest?.headers,
              parameters: savedRequest?.parameters,
              url: savedRequest.url,
              unsavedChanges: false,
            }
          : t
      ),
      activeTabId: savedRequest.id, // keep active in sync
    })),
}));
