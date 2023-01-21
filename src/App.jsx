import React, { useState } from "react";
import "./styles/App.scss";
import DragFile from "./components/drag-file/DragFile";
import Search from "./components/search/Search";

const App = () => {
  const [array, setArray] = useState([]);
  const [value, setValue] = useState("");
  const [hint, setHint] = useState(false);
  const [answer, setAnswer] = useState("Здесь будет ответ");
  const searchString = () => {
    if (value.length <= 2) {
      setHint(true);
      setAnswer("Здесь будет ответ");
      return false;
    }
    setHint(false);
    setAnswer(
      array.filter((el) => {
        return el.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  return (
    <>
      <Search
        value={value}
        setValue={setValue}
        setHint={setHint}
        className="search"></Search>
      {hint === true ? (
        <span
          className="hintBox"
          style={{ opacity: hint ? "1.0" : "0" }}>
          Введите больше двух символов
        </span>
      ) : (
        false
      )}
      <div className="box">
        <h2 className="header">
          {answer === "Здесь будет ответ"
            ? "Здесь будет ответ"
            : answer.length > 0
            ? "Номер найден"
            : "Номер не найден"}
        </h2>
        <DragFile setArray={setArray}></DragFile>
      </div>
      <div className="btn">
        <button onClick={searchString}>Найти номер</button>
      </div>
    </>
  );
};

export default App;
