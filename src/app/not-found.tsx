const NotFound = () => {
  return (
    <main className="flex-1 flex flex-col bg-very-light-gray dark:bg-very-dark-blue-bg px-8 py-8 md:py-12 justify-center items-center">
      <div className="flex items-center">
        <span className="border-r border-solid border-neutral-600 dark:border-neutral-400 p-4 text-3xl font-extralight">
          404
        </span>
        <h1 className="pl-4 text-2xl font-light text-neutral-600 dark:text-neutral-400">
          Page Not Found
        </h1>
      </div>
    </main>
  );
};

export default NotFound;
