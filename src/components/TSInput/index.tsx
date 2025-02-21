import React from "react";
import "./style.scss";
import { Input } from "antd";
import { IInput } from "../../common/Types";

const TSInput: React.FC<IInput> = ({ value, onChange }) => {
  return <Input value={value} onChange={onChange} />;
};

export default TSInput;
