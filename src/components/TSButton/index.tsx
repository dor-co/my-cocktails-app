import React from "react";
import { Button } from "antd";
import { IButton } from "../../common/Types";
import "./style.scss";

const TSButton: React.FC<IButton> = ({
  label,
  onClick,
  disabled,
  htmlType = "button",
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} htmlType={htmlType}>
      {label}
    </Button>
  );
};

export default TSButton;
