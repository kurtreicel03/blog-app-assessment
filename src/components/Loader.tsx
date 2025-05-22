const Loader = () => {
  return (
    <>
      <p className="text-center text-xl">SAVING...</p>
      <div className="flex items-center justify-center text-3xl">
        <div className="w-30 h-30 border-b-10 border-indigo-500 border-solid rounded-full animate-spin"></div>
      </div>
    </>
  );
};

export default Loader;
