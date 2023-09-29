import { styled } from "@mui/material";
import Link from "next/link";
import React from "react";

export const Title = styled("h3")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#A169D9",
  fontSize: 25,
  lineHeight: "22px",
  marginBottom: 20,
}));

export const SeeAll = styled(Link)(() => ({
  marginTop: 30,
  color: "#444444",
  fontSize: 25,
  lineHeight: "22px",
  fontWeight: 700,
}));

type Props = {
  children: React.ReactNode;
  seeAll?: string;
};

const SectionHeader = ({ children, seeAll }: Props) => {
  return (
    <Title>
      {children}
      {seeAll ? <SeeAll href={seeAll}>See all</SeeAll> : ""}
    </Title>
  );
};

export default SectionHeader;
