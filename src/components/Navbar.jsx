const Navbar = () => {
  return (
    <nav className="bg-[#121212] border-b border-[#2a2a2a] p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 sm:w-24 md:w-32 lg:w-40 xl:w-48"
          />
        </div>

        <button 
          className="px-5 py-2 text-[11px] tracking-widest text-[#a0a0a0] hover:text-[#f0f0f0] transition-colors duration-300 uppercase font-light"
          onClick={() => {window.location.reload()}}
        >
          New Canvas
        </button>
      </div>
    </nav>
  );
};

export default Navbar;