import { create } from "zustand";
import { nanoid } from "nanoid";
import { StringToBoolean } from "class-variance-authority/types";

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
