import { makeAutoObservable } from "mobx";
import { Data } from "types/data";

class DataStore {
  data: Data = {
    login: "",
    password: "",
    rememberMe: false
  };

  getDataFromLocalStorage = (): void => {
    if (localStorage.getItem("loginData") !== null) {
      this.data = JSON.parse(localStorage.getItem("loginData") as string);
    }
  };

  setDataInLocalStorage = (value: Data): void => {
    localStorage.setItem("loginData", JSON.stringify(value));
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default DataStore;
