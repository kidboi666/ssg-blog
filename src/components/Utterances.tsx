import { useEffect, useRef } from "preact/hooks";

interface Props {
  slug?: string;
}
const Utterances = ({ slug }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    // const container = document.querySelector("#utterances-container");
    const container = ref.current;
    const currentTheme = localStorage.theme;
    Object.entries({
      src: "https://utteranc.es/client.js",
      repo: "kidboi666/ssg-blog",
      "issue-term": "pathname",
      label: "comments",
      theme: currentTheme === "light" ? "github-light" : "github-dark",
      crossorigin: "anonymous",
    }).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    container?.appendChild(script);
  }, [slug]);

  return <div ref={ref}></div>;
};

export default Utterances;
