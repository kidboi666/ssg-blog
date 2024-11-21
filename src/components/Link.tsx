import type { PropsWithChildren } from "preact/compat";
import Icon from "./Icon";
import { cva } from "class-variance-authority";
import cn from "src/lib/cn";

interface Props {
  href?: string;
  intent?: "primary" | "secondary" | "icon";
  icon?: "home" | "category" | "question" | "github";
  size?: "sm" | "md" | "lg";
  padding?: "sm" | "md" | "lg";
  className?: string;
  viewBox?: string;
  fill?: string;
}

const link = cva("transition rounded-lg flex", {
  variants: {
    intent: {
      primary: [
        "bg-blue-400",
        "text-white",
        "dark:bg-blue-800",
        "hover:bg-blue-500",
      ],
      secondary: [
        "text-zinc-500",
        "dark:text-zinc-400",
        "hover:text-zinc-800",
        "hover:bg-zinc-200",
        "dark:hover:bg-zinc-600",
      ],
      icon: [
        "hover:bg-blue-500",
        "hover:text-white",
        "dark:text-zinc-400",
        "dark:hover:text-white",
      ],
    },
    size: {
      sm: ["text-sm"],
      md: ["text-base"],
      lg: ["text-lg"],
    },
    padding: {
      sm: ["p-1"],
      md: ["p-2"],
      lg: ["p-3"],
    },
  },
});

const Link = ({
  href,
  className,
  size = "md",
  intent = "primary",
  padding,
  icon,
  fill,
  viewBox,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <a
      href={href}
      class={cn("active:scale-90", link({ intent, size, padding }), className)}
    >
      {intent === "icon" && icon ? (
        <>
          <Icon icon={icon} fill={fill} viewBox={viewBox} />
          {children}
        </>
      ) : (
        <p>{children}</p>
      )}
    </a>
  );
};

export default Link;
