import { Router } from "../../lib/electron-router-dom.js";
import { Route } from "react-router-dom";

import { Blank } from "./pages/blank";
import { Document } from "./pages/documents";
import { Default } from "./pages/layouts/default.js";

export function Routes() {
  return (
    <Router
      main={
        <Route path="/" element={<Default />}>
          <Route path="/" element={<Blank />} />
          <Route path="/document/:id" element={<Document />} />
        </Route>
      }
    />
  );
}
