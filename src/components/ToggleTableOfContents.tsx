import cn from "src/lib/cn";
import Button from "./Button";
import { useState } from "preact/hooks";

interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const ToggleTableOfContents = ({ headings }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenCategory = () => {
    setOpen((prev) => !prev);
  };

  return (
    <aside class="dark:bg-var-accent-dark h-fit w-full border-b bg-zinc-100 px-8 py-2 xl:hidden dark:border-zinc-800">
      <div class="sticky top-20 w-full xl:h-[calc(100dvh-120px)]">
        <div class="flex h-full flex-col gap-2 overflow-y-scroll scrollbar-none">
          <Button
            onClick={handleOpenCategory}
            intent="secondary"
            padding="md"
            size="xs"
            className="w-fit"
          >
            목차 보기
          </Button>
          {isOpen &&
            headings.map((heading) => (
              <a href={`#${heading.slug}`}>
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
