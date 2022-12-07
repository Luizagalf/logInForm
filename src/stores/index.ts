import DataStore from "./dataStore";
import { createContext, useContext } from "react";

export default class RootStore {
  dataStore = new DataStore();
}

const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
