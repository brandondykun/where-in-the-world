const Loading = () => {
  return (
    <main className="flex-1 flex flex-col bg-very-light-gray dark:bg-very-dark-blue-bg px-8 py-8 md:py-12">
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-16 [@media(min-width:2400px)]:w-[1000px] [@media(min-width:2400px)]:mx-auto">
        {Array(12)
          .fill(0)
          .map((_, i) => {
            return (
              <div
                className="rounded bg-white dark:bg-dark-blue shadow-md h-[414px] w-full max-w-sm md:m-0 m-auto"
                key={i}
              ></div>
            );
          })}
      </div>
    </main>
  );
};

export default Loading;
