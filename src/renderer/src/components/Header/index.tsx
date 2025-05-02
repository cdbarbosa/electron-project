import clsx from "clsx";
import { Code, CaretDoubleRight, TrashSimple } from "phosphor-react";
import * as Breadcrumbs from "./Breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Document } from "src/shared/types/ipc";

export function Header() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isMacOS = process.platform === "darwin";
  const isSidebarOpen = true;

  const { mutate: deleteDocument, isPending } = useMutation({
    mutationKey: ["delete.document"],
    mutationFn: async () => await window.api.deleteDocument({ id: id! }),
    onSuccess: () => {
      queryClient.setQueryData(["documents"], (documents: Document[]) => {
        return documents.filter((document) => document.id !== id);
      });
      navigate("/");
    },
  });

  return (
    <div
      id="header"
      className={clsx(
        "border-b h-14 border-rotion-600 py-[1.125rem] px-6 flex items-center gap-4 leading-tight transition-all duration-250 region-drag",
        {
          "pl-24": !isSidebarOpen && isMacOS,
          "w-screen": !isSidebarOpen,
          "w-[calc(100vw-240px)]": isSidebarOpen,
        },
      )}
    >
      <button
        className={clsx("h-5 w-5 text-rotion-200 hover:text-rotion-50", {
          hidden: isSidebarOpen,
          block: !isSidebarOpen,
        })}
      >
        <CaretDoubleRight className="h-4 w-4" />
      </button>

      {id && (
        <>
          <Breadcrumbs.Root>
            <Breadcrumbs.Item>
              <Code weight="bold" className="h-4 w-4 text-pink-500" />
              Estrutura técnica
            </Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.HiddenItems />
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
            <Breadcrumbs.Separator />
            <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
          </Breadcrumbs.Root>

          <div className="inline-flex region-no-drag">
            <button
              onClick={() => deleteDocument()}
              disabled={isPending}
              className="cursor-pointer inline-flex items-center gap-1 text-rotion-100 text-sm hover:text-rotion-50"
            >
              <TrashSimple className="h-4 w-4" />
              Apagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
