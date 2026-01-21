import React, { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX, HiMoon, HiSun } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1. Check LocalStorage/System preference on load
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // 2. Toggle Function
  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Navbar Container: Glassmorphism Effect */}
      <div className="flex items-center justify-between py-4 px-7 border-b transition-colors duration-300
        bg-white/80 border-alice-200 backdrop-blur-md
        dark:bg-stormy-200/90 dark:border-stormy-300"
      >
        
        {/* Left Side: Mobile Menu & Logo */}
        <div className="flex items-center gap-5">
          <button 
            className="block lg:hidden text-2xl text-stormy-500 dark:text-alice-500 transition-colors"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>

          <h2 className="text-xl font-bold tracking-tight text-stormy-500 dark:text-alice-500">
            Xpense Tracker
          </h2>
        </div>

        {/* Right Side: Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full transition-all duration-300
            bg-alice-600 text-stormy-500 hover:bg-stormy-500 hover:text-white
            dark:bg-stormy-300 dark:text-pearl-500 dark:hover:bg-pearl-500 dark:hover:text-stormy-100"
        >
          {isDarkMode ? <HiSun className="text-xl" /> : <HiMoon className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {openSideMenu && (
        <div className="fixed inset-0 top-[73px] z-40 lg:hidden">
          {/* Overlay to close menu */}
          <div className="absolute inset-0 bg-stormy-100/50 backdrop-blur-sm" onClick={() => setOpenSideMenu(false)}></div>
          
          {/* Menu Content */}
          <div className="relative w-64 h-full shadow-2xl transition-colors duration-300
            bg-white border-r border-alice-200
            dark:bg-stormy-200 dark:border-stormy-300">
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;