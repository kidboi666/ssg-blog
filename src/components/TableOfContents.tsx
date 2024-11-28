import { useEffect, useRef, useState } from "preact/hooks";
import cn from "src/lib/cn";

interface Props {
  headings: { depth: number; slug: string; text: string }[];
}

const TableOfContents = ({ headings }: Props) => {
  const [activeObj, setActiveObj] = useState<Record<string, boolean>>({});
  const lastHeading = useRef<string>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveObj((prev) => ({ ...prev, [entry.target.id]: true }));
          lastHeading.current = entry.target.id;
        } else {
          setActiveObj((prev) => ({ ...prev, [entry.target.id]: false }));
        }
      });
    });

    const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headingElements.forEach((el) => observer.observe(el));

    return () => {
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <aside class="w-64 border-l border-zinc-200 p-5 dark:border-zinc-800 max-xl:hidden">
      <div class="sticky top-20 w-full xl:h-[calc(100dvh-120px)]">
        <div class="flex h-full flex-col gap-2 overflow-y-scroll scrollbar-none">
          <p class="text-lg dark:text-zinc-400">목차</p>
          <ul class="flex flex-col">
            {headings.map((heading) => (
              <li key={heading.slug}>
                <a href={`#${heading.slug}`} class="flex">
                  {Array.from({ length: heading.depth - 1 }, () => (
                    <div class="w-[1em] flex-shrink-0 border-l border-zinc-200 dark:border-zinc-800" />
                  ))}
                  <p
                    class={cn(
                      "heading py-1 text-sm text-zinc-500 transition-all hover:text-zinc-200",
                      activeObj[heading.slug] && "text-blue-600",
                    )}
                  >
                    {heading.text}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default TableOfContents;
