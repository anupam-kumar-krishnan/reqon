import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addRequestToCollection,
  type Request,
  getAllRequestFromCollection,
  saveRequest,
} from "../actions";
import { useRequestPlayground as useRequestPlaygroundStore } from "../store/useRequestStore";

export function useAddRequestToCollection(collectionId: string) {
  const queryClient = useQueryClient();
  const { updateTabFromSavedRequest, activeTabId } =
    useRequestPlaygroundStore();

  return useMutation({
    mutationFn: async (value: Request) =>
      addRequestToCollection(collectionId, value),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests", collectionId] });

      // @ts-ignore
      updateTabFromSavedRequest(activeTabId!, data);
    },
  });
}

export function useGetAllRequestFromCollection(collectionId: string) {
  return useQuery({
    queryKey: ["requests", collectionId],
    queryFn: async () => getAllRequestFromCollection(collectionId),
  });
}

export function useSaveRequest(id: string) {
  const { updateTabFromSavedRequest, activeTabId } =
    useRequestPlaygroundStore();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (value: Request) => saveRequest(id, value),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      // @ts-ignore
      updateTabFromSavedRequest(activeTabId!, data);
    },
  });
}
