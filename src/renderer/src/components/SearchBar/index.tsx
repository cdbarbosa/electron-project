import { useQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import { File, MagnifyingGlass } from "phosphor-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Document } from "src/shared/types/ipc";

interface SearchBarParams {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export function SearchBar({ open, setOpen }: SearchBarParams) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const { data } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      return await window.api.fetchDocuments().then(({ data }) => data);
    },
    initialData() {
      return [];
    },
  });

  return (
    <Command.Dialog
      className="fixed top-24 left-1/2 -translate-x-1/2 w-[480px] max-w-full bg-rotion-800 rounded-md shadow-2xl text-rotion-100 border border-rotion-600"
      open={open}
      onOpenChange={setOpen}
      label="Search"
    >
      <div className="flex items-center gap-2 border-b border-rotion-700 p-4">
        <MagnifyingGlass className="w-5 h-5" />
        <Command.Input
          autoFocus
          placeholder="Buscar documentos..."
          className="w-full bg-transparent focus:outline-none text-sm text-rotion-50 placeholder:text-rotion-200"
        />
      </div>
      <Command.List className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800">
        <Command.Empty className="py-3 px-4 text-rotion-200 text-sm">
          Nenhum documento encontrado.
        </Command.Empty>

        {data?.map((item: Document) => (
          <Command.Item
            key={item.id}
            onSelect={() => {
              navigate(`document/${item.id}`);
              setOpen(false);
            }}
            className="py-3 px-4 text-rotion-50 text-sm flex items-center gap-2 hover:bg-rotion-700 aria-selected:!bg-rotion-600"
          >
            <File className="w-4 h-4" />
            {item.title}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
