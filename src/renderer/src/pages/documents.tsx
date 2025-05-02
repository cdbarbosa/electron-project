import { Editor } from "@renderer/components/Editor";
import { ToC } from "../components/ToC";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function Document() {
  const { id } = useParams<{ id: string }>();

  const { data, isFetching } = useQuery({
    queryKey: ["document.by.id"],
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: id! });

      return response.data;
    },
  });

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
          <Editor content={initialContent} />
        )}
      </section>
    </main>
  );
}
