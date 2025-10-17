"use client";

import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { useCreateWorkspace } from "@/modules/workspace/hooks/workspace";
import React, { useState } from "react";
import { toast } from "sonner";
import { fa } from "zod/v4/locales";

const CreateWorkspace = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const { mutateAsync, isPending } = useCreateWorkspace();

  const handleSubmit = async () => {
    if (!name.trim()) return;
    try {
      await mutateAsync(name);
      toast.success("Workspace Created Successfully");
      setName("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to Create Workspace");
      console.error("Failed to Create Workspace:", error);
    }
  };

  return (
    <Modal
      title="Add New Workspace"
      description="Create a new workspace to organize your projects"
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmit}
      submitText={isPending ? "Creating..." : "Create Workspace"}
      submitVariant="default"
    >
      <div className="space-y-4">
        <Input
          className="w-full p-2 border rounded-sm"
          placeholder="Workspace Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </Modal>
  );
};

export default CreateWorkspace;
