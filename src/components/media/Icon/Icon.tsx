import { ComponentProps } from "react";
import { ReactSVG } from "react-svg";
import { styled, theme } from "@/styles/stitches.config";

interface IconProps extends ComponentProps<typeof IconContainer> {
  src: string;
}
export const Icon = ({ src, ...props }: IconProps) => {
  return (
    <IconContainer {...props}>
      <ReactSVG src={src} wrapper={"span"} />
    </IconContainer>
  );
};

const IconContainer = styled("span", {
  "& svg": {
    _alignCenter: true,
  },

  "color": theme.colors.background1,

  "variants": {
    svg: {
      fill: {
        _iconColor: { fill: theme.colors.text1 },
      },
      stroke: {
        _iconColor: { stroke: theme.colors.text1 },
      },
    },
    sSize: {
      small: {
        "& svg": { height: "1rem", width: "1rem" },
      },
      medium: {
        "& svg": { height: "1.5rem", width: "1.5rem" },
      },
      large: {
        "& svg": { height: "2rem", width: "2rem" },
      },
    },
  },

  "defaultVariants": {
    sSize: "medium",
    svg: "fill",
  },
});
