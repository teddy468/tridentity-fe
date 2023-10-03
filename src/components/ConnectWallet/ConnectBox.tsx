import React from "react";
import "./styles";
import { BoxConnect, GroupContent, TextConnect } from "./styles";

interface IConnectBoxProps {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const ConnectBox: React.FC<IConnectBoxProps> = (props: IConnectBoxProps) => {
  const { icon, onClick, text } = props;

  return (
    <BoxConnect onClick={onClick}>
      <GroupContent>
        {icon}
        <TextConnect>{text}</TextConnect>
      </GroupContent>
    </BoxConnect>
  );
};

export default ConnectBox;
