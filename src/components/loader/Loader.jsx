const Loader = ({ extra }) => {
  return (
    <div
      className={` ${extra} flex min-h-screen items-center justify-center  bg-gray-100 dark:bg-navy-800`}
    >
      <div className="flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
      </div>
    </div>
  );
};

export default Loader;
