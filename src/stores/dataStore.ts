import { makeAutoObservable } from "mobx";

type Data = { login: string; password: string; rememberMe: boolean };

class DataStore {
  data: Data = {
    login: "",
    password: "",
    rememberMe: false
  };

  getDataFromLocalStorage = () => {
    if (localStorage.getItem("loginData") !== null) {
      this.data = JSON.parse(localStorage.getItem("loginData") as string);
    }
  };

  setDataInLocalStorage = (value: Data) => {
    localStorage.setItem("loginData", JSON.stringify(value));
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export default DataStore;
