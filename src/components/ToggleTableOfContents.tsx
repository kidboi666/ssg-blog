import cn from "src/lib/cn";
import Button from "./Button";
import { useEffect, useRef, useState } from "preact/hooks";

interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const ToggleTableOfContents = ({ headings }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id); // 현재 보이는 헤딩의 ID를 설정
        }
      });
    });

    // 모든 헤딩 요소를 관찰
    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingElements.forEach((el) => observer.observe(el));

    return () => {
      // 컴포넌트 언마운트 시 옵저버 해제
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <aside
      ref={ref}
      class="sticky top-[53px] z-40 h-fit w-full overflow-y-auto border-b bg-zinc-100 px-4 py-2 shadow-sm dark:border-zinc-800 dark:bg-var-accent-dark xl:hidden"
    >
      <div class="sticky top-20 h-fit w-full">
        <div class="flex flex-col gap-4 overflow-y-auto">
          <Button
            onClick={handleOpenCategory}
            intent="secondary"
            padding="md"
            size="xs"
            className={cn(
              "w-fit bg-white dark:bg-var-main-dark",
              isOpen ? "border-blue-400 dark:border-blue-700" : "",
            )}
          >
            목차 보기
          </Button>
          {isOpen && (
            <ul class="flex max-h-[calc(100dvh-300px)] flex-col gap-4 overflow-y-auto">
              {headings.map((heading) => (
                <a href={`#${heading.slug}`} onClick={handleOpenCategory}>
                  <p
                    class={cn(
                      "heading text-sm text-zinc-500 transition-all hover:text-zinc-200",
                      heading.slug === activeId
                        ? "text-base text-zinc-200"
                        : "",
                      heading.depth === 2 && "ml-4",
                      heading.depth === 3 && "ml-5",
                      heading.depth === 4 && "ml-7",
                    )}
                  >
                    {heading.text}
                  </p>
                </a>
              ))}
            </ul>
          )}
        </div>
      </div>
    </aside>
  );
};
export default ToggleTableOfContents;
