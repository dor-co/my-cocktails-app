import React from "react";
import { Spin } from "antd";

const Loader: React.FC = ({}) => {
  return <Spin size="large" fullscreen={true} />;
};

export default Loader;
