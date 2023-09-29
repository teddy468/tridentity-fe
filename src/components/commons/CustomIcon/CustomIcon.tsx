import React, { useEffect, useRef, useState } from "react";
import { Box, BoxProps, styled } from "@mui/material";

const IconBox = styled(Box)(() => ({
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
}));

interface DefaultProps extends BoxProps {
  id?: string;
  /**
   * Import default from svg, eg: import { ReactComponent as ProfileIcon } from "./profile.svg";
   */
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  /**
   * @requires width if not set height;
   */
  width?: number;
  /**
   * @requires height if not set width;
   */
  height?: number;
  /**
   * If not set originHeight, icon will invisible when first load;
   */
  originWidth?: number;
  /**
   * If not set originHeight, icon will invisible when first load;
   */
  originHeight?: number;
  /**
   * Apply color for fill of path. If fill = undefiend, fill color is svg origin color
   */
  fill?: "currentColor" | "gradient" | BoxProps["color"];
  /**
   * Apply color for stroke of path. If stroke = undefiend, stroke color is svg origin color
   */
  stroke?: "currentColor" | "gradient" | BoxProps["color"];
}
type Props = DefaultProps & Required<{ width: number } | { height: number }>;

const CustomIcon: React.FC<Props> = React.forwardRef((props, boxRef) => {
  const { id, icon, width, height, originWidth, originHeight, fill, stroke, ...otherProps } = props;
  const ref = useRef<HTMLElement | null>(null);
  const [svgWidth, setSvgWidth] = useState<number | undefined>(originWidth);
  const [svgHeight, setSvgWheight] = useState<number | undefined>(originHeight);
  const [mounted, setMounted] = useState(false);

  const gradientId = `gradient-${id ?? 0}`;

  useEffect(() => {
    if (ref.current) {
      const svg = ref.current.children[ref.current.children.length - 1] as SVGSVGElement;
      setSvgWidth(svg?.width?.baseVal?.value);
      setSvgWheight(svg?.height?.baseVal?.value);
      setMounted(true);
    }
  }, []);

  const scaleX = svgWidth && (width || 0) / svgWidth;
  const scaleY = svgHeight && (height || 0) / svgHeight;

  const StyledIcon = styled(icon, { shouldForwardProp: props => props !== "ref" })<{ ref?: React.Ref<unknown> }>(
    () => ({
      transform: scaleX || scaleY ? `scale(${scaleX || scaleY}, ${scaleY || scaleX})` : "none",
      path: {
        fill: fill === "gradient" ? `url(#${gradientId})` : fill,
        stroke: stroke === "gradient" ? `url(#${gradientId})` : stroke,
      },
    })
  );

  return (
    <IconBox width={width} height={height} {...otherProps} visibility={mounted ? "visible" : "hidden"} ref={boxRef}>
      {(fill === "gradient" || stroke === "gradient") && (
        <svg width={0} height={0}>
          <linearGradient id={gradientId} gradientTransform="rotate(94.22)">
            <stop id="stop1" offset="0%" stopColor="#FDCD9D" stopOpacity="0.5" />
            <stop id="stop2" offset="100%" stopColor="#F7EF82" />
          </linearGradient>
        </svg>
      )}
      <IconBox ref={ref}>
        <StyledIcon />
      </IconBox>
    </IconBox>
  );
});

export default CustomIcon;
