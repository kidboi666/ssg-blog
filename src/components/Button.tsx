import type { PropsWithChildren } from "preact/compat";
import { cva } from "class-variance-authority";
import cn from "src/lib/cn";
import Icon from "./Icon";

interface Props {
  intent?: "primary" | "secondary" | "icon" | "teritory";
  padding?: "sm" | "md" | "lg";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: "home" | "category" | "question" | "menu" | "cancel" | "sun" | "moon";
  className?: string;
  id?: string;
  viewBox?: string;
  onClick?: () => void;
}

const button = cva("transition", {
  variants: {
    intent: {
      primary: [
        "bg-blue-400",
        "text-white",
        "dark:bg-blue-800",
        "hover:bg-blue-500",
        "rounded-lg",
      ],
      secondary: [
        "text-zinc-500",
        "dark:text-zinc-400",
        "border",
        "border-zinc-400",
        "dark:border-zinc-600",
        "hover:text-zinc-800",
        "hover:bg-zinc-200",
        "dark:hover:bg-zinc-600",
        "rounded-lg",
      ],
      teritory: ["text-zinc-600", "dark:text-zinc-300", "bg-transparent"],
      icon: [
        "hover:bg-blue-500",
        "hover:text-white",
        "dark:text-zinc-400",
        "dark:hover:text-white",
        "rounded-lg",
      ],
    },
    size: {
      xs: ["text-xs"],
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

const Button = ({
  size,
  padding,
  intent = "primary",
  icon,
  className,
  id,
  viewBox,
  onClick,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <button
      onClick={onClick}
      id={id ? id : "button"}
      class={cn(button({ intent, size, padding }), className)}
    >
      {intent === "icon" && icon ? (
        <>
          <Icon icon={icon} viewBox={viewBox} />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
