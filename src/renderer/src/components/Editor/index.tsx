import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";

export function Editor() {
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
    content:
      "<h1>Back-end</h1><p>Esse é o document que explica sobre back-end</p>",
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "text-rotion-50 focus:outline-none prose prose-invert",
      },
    },
  });
  return <EditorContent className="w-[65ch]" editor={editor} />;
}
