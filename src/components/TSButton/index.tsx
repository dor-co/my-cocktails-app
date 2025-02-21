import React from "react";
import "./style.scss";
import { Button } from "antd";
import { IButton } from "../../common/Types";

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
