import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";

export interface OnContentUpdatedParams {
  title: string;
  content: string;
}

interface EditorProps {
  content: string;
  onContentUpdate: (params: OnContentUpdatedParams) => void;
}

export function Editor({ content, onContentUpdate }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Document.extend({
        content: "heading block*",
      }),
      StarterKit.configure({
        document: false,
      }),
      Highlight,
      Typography,
      Placeholder.configure({
        placeholder: "Untitle",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none",
      }),
    ],
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/;
      const parsedContent = editor.getHTML().match(contentRegex)?.groups;

      const title = parsedContent?.title ?? "Untitled";
      const content = parsedContent?.content ?? "";

      onContentUpdate({ title, content });
    },
    content,
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "text-rotion-50 focus:outline-none prose prose-invert",
      },
    },
  });
  return <EditorContent className="w-[65ch]" editor={editor} />;
}
