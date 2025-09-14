export const SexyButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="whitespace-nowrap text-sm ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 cursor-pointer py-2 inline-flex items-center justify-center gap-4 rounded-xl font-medium relative h-10 px-6 min-w-72 md:min-w-56 bg-white dark:bg-black text-black dark:text-white border border-black/0 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 backdrop-blur-xs shadow-md hover:shadow-lg transition-all duration-200">
      {children}
    </button>
  );
};
