const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <button class="mt-4 flex gap-2">
      {tags?.map((tag) => (
        <div class="rounded-2xl bg-zinc-300 px-2 py-1 text-xs text-zinc-500 hover:text-zinc-800 dark:bg-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200">
          {tag}
        </div>
      ))}
    </button>
  );
};

export default Tags;
