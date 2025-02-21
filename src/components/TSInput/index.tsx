import React from "react";
import "./style.scss";
import { Input } from "antd";
import { IInput } from "../../common/Types";

const TSInput: React.FC<IInput> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
}) => {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      name={name}
    />
  );
};

export default TSInput;
