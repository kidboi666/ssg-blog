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

const button = cva("transition active:scale-95 rounded-lg", {
  variants: {
    intent: {
      primary: [
        "bg-blue-400",
        "text-white",
        "shadow-sm",
        "dark:bg-blue-800",
        "hover:bg-blue-500",
      ],
      secondary: [
        "text-zinc-600",
        "border",
        "border-zinc-400",
        "shadow-sm",
        "dark:text-zinc-300",
        "dark:border-zinc-600",
        "dark:hover:border-zinc-400",
        "hover:border-zinc-800",
      ],
      teritory: ["text-zinc-600", "dark:text-zinc-300", "bg-transparent"],
      icon: [
        "hover:bg-blue-500",
        "hover:text-white",
        "dark:text-zinc-400",
        "dark:hover:text-white",
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
      id={id}
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
