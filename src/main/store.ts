// import Store from "electron-store";

// interface StoreType {
//   documents: Record<string, any>;
// }

// export const store = new Store<StoreType>();
//
const StoreModule = require("electron-store");
const Store = StoreModule.default || StoreModule;

// Initialize electron-store
export const store = new Store({
  defaults: {
    documents: {},
  },
});
