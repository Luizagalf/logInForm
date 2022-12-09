import "./form.scss";
import { useState, useEffect } from "react";
import OpenEye from "assets/img/OpenEye.svg";
import CloseEye from "assets/img/CloseEye.svg";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import { Data } from "types/data";

const Form = () => {
  const { dataStore } = useStores();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [values, setValues] = useState<Data>({
    login: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState<{
    password: string;
    rememberMe: string;
  }>({
    password: "",
    rememberMe: ""
  });

  useEffect(() => {
    dataStore.getDataFromLocalStorage();
  }, []);

  useEffect(() => {
    setValues(dataStore.data);
    setErrors({
      ...errors,
      rememberMe: dataStore.data.rememberMe
        ? "Warning! If you submit the form with the 'Remember me' flag, your data will be stored in local storage :)"
        : ""
    });
  }, [dataStore.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.name) {
      case "rememberMe":
        setValues({ ...values, [e.target.name]: e.target.checked });
        setErrors({
          ...errors,
          [e.target.name]: e.target.checked
            ? "Warning! If you submit the form with the 'Remember me' flag, your data will be stored in local storage :)"
            : ""
        });
        break;
      case "password":
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrors({
          ...errors,
          [e.target.name]:
            e.target.value.length < 6 && e.target.value.length > 0
              ? "Password must contain at least 6 characters"
              : ""
        });
        break;
      default:
        setValues({ ...values, [e.target.name]: e.target.value });
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (values.rememberMe) {
      dataStore.setDataInLocalStorage(values);
    }
    event.preventDefault();
    console.log(values);
    setValues({
      login: "",
      password: "",
      rememberMe: false
    });
    setErrors({
      password: "",
      rememberMe: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        name="login"
        type="text"
        placeholder="Login"
        value={values.login}
        onChange={handleChange}
        className="form__input"
      />
      <div className="form__passwordInput">
        <input
          name="password"
          type={isShowPassword ? "text" : "password"}
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          className="form__input"
          autoComplete="on"
        />
        <img
          src={isShowPassword ? OpenEye : CloseEye}
          alt={isShowPassword ? "Hide password" : "Show password"}
          onClick={() => setIsShowPassword(!isShowPassword)}
        />
      </div>
      <label className="form__label">
        <input
          name="rememberMe"
          type="checkbox"
          checked={values.rememberMe}
          onChange={handleChange}
          className="form__checkbox"
        />
        Remember me
      </label>
      <input
        type="submit"
        value="Sign in"
        className="form__button"
        disabled={!values.login || !values.password}
      />
      <div className="form__errors">
        {Object.entries(errors).map(
          ([key, error]: [string, string]): JSX.Element => (
            <p
              key={key}
              style={{ color: key === "password" ? "red" : "#807490" }}
            >
              {error}
            </p>
          )
        )}
      </div>
    </form>
  );
};

export default observer(Form);
