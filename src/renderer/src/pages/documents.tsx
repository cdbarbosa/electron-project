import { Editor, OnContentUpdatedParams } from "@renderer/components/Editor";
import { ToC } from "../components/ToC";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { Document as IDocument } from "src/shared/types/ipc";

export function Document() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["document.by.id", id],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! });

      return response.data;
    },
  });

  const { mutate: onUpdateDocument } = useMutation({
    mutationKey: ["document.update"],
    mutationFn: async ({ title, content }: OnContentUpdatedParams) => {
      await window.api.saveDocument({
        id: id!,
        title,
        content,
      });
    },
    onSuccess: (_, { title }) => {
      queryClient.setQueryData(["documents"], (documents: IDocument[]) => {
        return documents?.map((document) => {
          if (document.id === id) {
            return { ...document, title };
          }

          return document;
        });
      });
    },
  });

  const onHandleUpdateContent = (params: OnContentUpdatedParams) => {
    onUpdateDocument(params);
  };

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? "<p></p>"}`;
    }

    return "";
  }, [data]);

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs uppercase">
          Table of content
        </span>
        <ToC.Root>
          <ToC.Link>Back-End</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de Dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && initialContent?.trim()?.length && (
          <Editor
            content={initialContent}
            onContentUpdate={onHandleUpdateContent}
          />
        )}
      </section>
    </main>
  );
}
