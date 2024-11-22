import { useLayoutEffect, useState } from "preact/hooks";
import cn from "src/lib/cn";
import Button from "./Button";
import Icon from "./Icon";
import Link from "./Link";
import CategoryIcon from "./CategoryIcon";

interface Props {
  category: any;
  posts: any;
  slug: any;
}

const CategoryList = ({ category, slug, posts }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const openCategoryList = () => {
    setOpen((prev) => !prev);
    sessionStorage.setItem(`category-${category.name}`, String(!isOpen));
  };

  useLayoutEffect(() => {
    const isOpen =
      sessionStorage.getItem(`category-${category.name}`) === "true";
    if (isOpen) {
      setOpen(true);
    }
  }, []);

  return (
    <div>
      <Button
        onClick={openCategoryList}
        intent="teritory"
        className="relative z-10 mb-2 flex w-full items-center justify-between text-base"
      >
        <div className="flex gap-2">
          <CategoryIcon category={category.name} />
          {category.name}
        </div>
        <Icon
          id="arrow"
          icon="arrow"
          className={cn("transition-transform", isOpen ? "" : "-rotate-90")}
        />
      </Button>
      {isOpen && (
        <div
          id="list"
          class="ml-2 flex flex-col border-l px-2 dark:border-zinc-700"
        >
          {posts.map((post: any) => (
            <Link
              href={`/blog/${category.name}/${post.slug}`}
              size="sm"
              intent={post.slug === slug ? "primary" : "secondary"}
              padding="md"
            >
              {post.data.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
