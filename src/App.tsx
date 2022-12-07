import "./app.scss";
import BackWave from "assets/img/BackWave.png";
import FrontWave from "assets/img/FrontWave.png";
import Form from "components/Form";

const App = () => {
  return (
    <div className="app">
      <div className="app__main">
        <h1 className="app__title">Sign in</h1>
        <h1 className="app__subtitle">
          Sign in and see your result in console!
        </h1>
        <Form />
      </div>
      <div className="app__footer">
        <img src={BackWave} alt="" />
        <img src={FrontWave} alt="" />
      </div>
    </div>
  );
};

export default App;
