import { ipcMain } from "electron";
import { IPC } from "../shared/constants/ipc";
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  Document,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from "../shared/types/ipc";
import { store } from "./store";
import { randomUUID } from "node:crypto";

ipcMain.handle(
  IPC.DOCUMENTS.FETCH_ALL,
  async (): Promise<FetchAllDocumentsResponse> => {
    const documents = store.get("documents");
    return {
      data: Object.values(documents),
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.FETCH,
  async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
    const document: Document = store.get(`documents.${id}`);
    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.CREATE,
  async (): Promise<CreateDocumentResponse> => {
    const document: Document = {
      id: randomUUID(),
      title: "Untitle",
    };

    store.set(`documents.${document.id}`, document);

    return {
      data: document,
    };
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.SAVE,
  async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
    store.set(`documents.${id}`, { id, title, content });
  },
);

ipcMain.handle(
  IPC.DOCUMENTS.DELETE,
  async (_, { id }: DeleteDocumentRequest): Promise<void> => {
    store.delete(`documents.${id}`);
  },
);
