const PageHeader = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-bold tracking-tight md:text-2xl">
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex">Export</button>
          <button>
            <span className="hidden sm:inline-block">Add New</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
