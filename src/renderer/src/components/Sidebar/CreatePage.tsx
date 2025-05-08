import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "phosphor-react";

import { Document } from "../../../../shared/types/ipc";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function CreatePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createNewDocument, isPending } = useMutation({
    mutationKey: ["create-document"],
    mutationFn: async () => {
      const response = await window.api.createDocument();

      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["documents"], (documents: Document[]) => {
        return [...(documents || []), data];
      });

      navigate(`/document/${data.id}`);
    },
  });

  useEffect(() => {
    const unsubscribe = window.api.onNewDocumentRequest(createNewDocument);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <button
      disabled={isPending}
      onClick={() => createNewDocument()}
      className="flex w-[240px] cursor-pointer px-5 items-center text-rotion-50 text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Create new page
    </button>
  );
}
