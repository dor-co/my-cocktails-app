import React from "react";
import "./style.scss";
import { Button } from "antd";
import { IButton } from "../../common/Types";

const TSButton: React.FC<IButton> = ({ label, onClick, disabled }) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

export default TSButton;
