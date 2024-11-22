const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <button class="mt-4 flex gap-2">
      {tags?.map((tag) => (
        <div class="rounded-2xl bg-blue-600/15 px-2 py-1 text-xs text-blue-600 hover:text-blue-300 dark:hover:text-zinc-200">
          {tag}
        </div>
      ))}
    </button>
  );
};

export default Tags;
