import React, { useRef, useState } from "react";
import { ImageConfig } from "../../config/image";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./DragFile.scss";
import * as XLSX from "xlsx";

const DragFile = ({ setArray }) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  const [file, setFile] = useState("");

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      setArray(data.split("\n"));
      setFile(file);
    };
    if (file) reader.readAsBinaryString(file);
  };

  const fileRemove = () => {
    setFile("");
    setArray([]);
    inputRef.current.value = "";
  };

  return (
    <>
      <div
        className="dropFile"
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}>
        <div className="dropFileLabel">
          <AiOutlineCloudUpload
            color="blue"
            size={100}
          />
          <p>Перетащите свой файл сюда</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          onChange={onFileDrop}
        />
      </div>
      {file && (
        <div className="dropFilePrev">
          <div className="dropFilePrevTitle">Готов к загрузке</div>
          <div className="dropFileItem">
            <img
              src={
                file.name.split(".")[1] === "xlsx"
                  ? ImageConfig["excel"]
                  : ImageConfig[file.type.split("/")[1]] ||
                    ImageConfig["default"]
              }
              alt=""
            />
            <div className="dropFileItemInfo">
              <p>{file.name}</p>
              <p>{file.size}B</p>
            </div>
            <span
              className="dropFileItemDelete"
              onClick={fileRemove}>
              x
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default DragFile;
