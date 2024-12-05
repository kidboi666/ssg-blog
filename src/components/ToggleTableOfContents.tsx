import cn from "src/lib/cn";
import { useEffect, useRef, useState } from "preact/hooks";
import Button from "./Button";

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
      class="fixed left-0 right-0 top-[57px] z-20 mx-2 h-fit overflow-y-auto rounded-xl rounded-t-none border bg-zinc-50/95 px-4 py-1.5 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-var-accent-dark/95 md:px-4 lg:ml-[112px] xl:hidden"
    >
      <div class="sticky top-20 h-fit">
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
            <ul class="flex max-h-[calc(100dvh-300px)] flex-col overflow-y-auto">
              {headings.map((heading) => (
                <a
                  href={`#${heading.slug}`}
                  onClick={handleOpenCategory}
                  class="flex"
                >
                  {Array.from({ length: heading.depth - 1 }, () => (
                    <div class="w-[1em] flex-shrink-0 border-l border-zinc-200/85 dark:border-zinc-700/45" />
                  ))}
                  <p
                    class={cn(
                      "heading py-1 text-sm text-zinc-500 transition-all hover:text-zinc-900 dark:hover:text-zinc-200",
                      heading.slug === activeId && "text-base text-blue-600",
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
