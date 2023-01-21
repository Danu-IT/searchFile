import React from "react";
import "./Search.scss";

const Search = ({ setValue, value, setHint, ...props }) => {
  const change = (e) => {
    setHint(false);
    setValue(e.target.value);
  };
  return (
    <div
      className="form__group field"
      {...props}>
      <input
        value={value}
        onChange={change}
        type="input"
        className="form__field"
        placeholder="Name"
        name="name"
        id="name"
        required
      />
      <label className="form__label">Поиск</label>
    </div>
  );
};

export default Search;
