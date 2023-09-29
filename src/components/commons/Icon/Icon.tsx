import * as React from "react";
import { Box, SvgIconProps, styled } from "@mui/material";
import { useRef } from "react";

const IconBox = styled(Box)(() => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

interface Props extends SvgIconProps {
  id?: string;
  /**
   * Import default from svg, eg: import { default as ProfileIcon } from "./profile.svg";
   * Please export the origin svg from [Icon tab on Figma](https://www.figma.com/file/A4ZjDkAW0NrY1Yu9pd4H0p/%5BDesign%5D-Tridentity-Platform?node-id=166-2327&t=i9johDC9MtCh3kJc-0) and use the svg name to search.
   */
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  /**
   * @default 24;
   */
  width?: number;
  /**
   * @default 24;
   */
  height?: number;
  /**
   * @default 24;
   */
  originWidth?: number;
  /**
   * @default 24;
   */
  originHeight?: number;
  /**
   * @default "primary";
   */
  gradient?: boolean;
  isFill?: boolean;
}

const Icon: React.FC<Props> = props => {
  const {
    icon,
    width = 24,
    height = 24,
    originWidth = 24,
    originHeight = 24,
    color,
    id,
    gradient,
    isFill,
    ...otherProps
  } = props;
  const scaleX = width / originWidth;
  const scaleY = height / originHeight;

  const gradientId = `gradient-${id ?? 0}`;

  const StyledIcon = styled(icon)(() => ({
    transform: `scale(${scaleX},${scaleY})`,
    margin: "0",
    overflow: "unset",
    path: isFill
      ? {
          fill: gradient ? `url(#${gradientId})` : "currentColor",
        }
      : {
          stroke: gradient ? `url(#${gradientId})` : "currentColor",
        },
  }));
  return (
    <IconBox width={width} height={height}>
      {gradient && (
        <svg width={0} height={0}>
          <linearGradient id={gradientId} gradientTransform="rotate(94.22)">
            <stop id="stop1" offset="0%" stopColor="#FDCD9D" stopOpacity="0.5" />
            <stop id="stop2" offset="100%" stopColor="#F7EF82" />
          </linearGradient>
        </svg>
      )}
      <StyledIcon {...otherProps} />
    </IconBox>
  );
};

export default Icon;
