import { createContext, useContext } from "react";
import DataStore from "./dataStore";

export default class RootStore {
  dataStore = new DataStore();
}

const StoresContext = createContext(new RootStore());
export const useStores = () => useContext(StoresContext);
