import cn from "src/lib/cn";
import Button from "./Button";
import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const ToggleTableOfContents = ({ headings }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpenCategory = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    });
  }, []);

  return (
    <aside
      ref={ref}
      class="dark:bg-var-accent-dark sticky top-[53px] z-40 h-fit w-full border-b bg-zinc-100 px-4 py-2 shadow-sm lg:hidden dark:border-zinc-800"
    >
      <div class="sticky top-20 w-full lg:h-[calc(100dvh-120px)]">
        <div class="flex h-full flex-col gap-2 overflow-y-scroll scrollbar-none">
          <Button
            onClick={handleOpenCategory}
            intent="secondary"
            padding="md"
            size="xs"
            className={cn(
              "w-fit",
              isOpen ? "border-blue-400 dark:border-blue-700" : "",
            )}
          >
            목차 보기
          </Button>
          {isOpen &&
            headings.map((heading) => (
              <a href={`#${heading.slug}`} onClick={handleOpenCategory}>
                <p
                  class={cn(
                    "heading text-sm text-zinc-500 hover:text-blue-500",
                    heading.depth === 2 && "ml-4",
                    heading.depth === 3 && "ml-5",
                    heading.depth === 4 && "ml-7",
                  )}
                >
                  {heading.text}
                </p>
              </a>
            ))}
        </div>
      </div>
    </aside>
  );
};
export default ToggleTableOfContents;
