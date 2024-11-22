const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div class="mt-4 flex gap-2">
      {tags?.map((tag) => (
        <button class="rounded-2xl bg-blue-600/15 px-2 py-1 text-xs text-blue-600 transition hover:text-blue-300 dark:hover:text-zinc-200">
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
