const Navbar = () => {
  return (
    <nav className="bg-[#090909] p-4 w-screen">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48"
          />
        </div>

        <div className="space-x-4 flex items-center">
          <button className="text-white hover:text-gray-300" onClick={() => {window.location.reload()}}>
            Reset Canvas
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
