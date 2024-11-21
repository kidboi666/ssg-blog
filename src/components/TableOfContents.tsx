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
      let foundActive = false;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveObj((prev) => ({ ...prev, [entry.target.id]: true }));
          lastHeading.current = entry.target.id;
          foundActive = true;
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
    <aside class="w-64 border-b border-l border-zinc-200 p-5 dark:border-zinc-800 max-xl:hidden">
      <div class="sticky top-20 w-full xl:h-[calc(100dvh-120px)]">
        <div class="flex h-full flex-col gap-2 overflow-y-scroll scrollbar-none">
          <p class="text-lg dark:text-zinc-400">목차</p>
          <ul class="flex flex-col gap-2">
            {headings.map((heading) => (
              <li key={heading.slug}>
                <a href={`#${heading.slug}`}>
                  <p
                    class={cn(
                      "heading text-sm text-zinc-500 transition-all hover:text-zinc-200",
                      activeObj[heading.slug] ? "text-zinc-200" : "",
                      heading.depth === 2 && "ml-4",
                      heading.depth === 3 && "ml-5",
                      heading.depth === 4 && "ml-7",
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
// <style>
//   .heading2 {
//     margin-left: 16px;
//   }
//   .heading3 {
//     margin-left: 20px;
//   }
//   .heading4 {
//     margin-left: 28px;
//   }
// </style>
