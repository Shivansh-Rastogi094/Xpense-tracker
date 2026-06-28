import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-256px)] h-16 bg-surface/30 backdrop-blur-[32px] border-b border-white/5 flex justify-between items-center px-container-padding z-40 transition-all">
        
        {/* Left Side: Mobile Menu */}
        <div className="flex items-center gap-5 lg:hidden">
          <button 
            className="text-2xl text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
          <h2 className="text-title-md font-bold text-primary">
            xpense-tracker
          </h2>
        </div>

        {/* Desktop Search Bar (Optional for later, keeping structure) */}
        <div className="hidden lg:flex items-center bg-surface-container-lowest/50 rounded-full px-4 py-2 border border-white/10 w-96 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
          <span className="material-symbols-outlined text-on-surface-variant text-body-md">search</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-on-surface placeholder-on-surface-variant font-body-md w-full ml-2 outline-none" 
            placeholder="Search transactions..." 
            type="text" 
          />
        </div>

        {/* Right Side: Profile */}
        <div className="flex items-center gap-6 ml-auto">
          <div className="flex items-center gap-3 pl-4 lg:border-l lg:border-white/10">
            <div className="text-right hidden sm:block">
              <p className="font-title-md text-on-surface leading-none">{user?.fullName || "User"}</p>
              <p className="text-label-sm text-on-surface-variant">Pro Member</p>
            </div>
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-primary object-cover shadow-lg shadow-primary/20"
              />
            ) : (
              <CharAvatar
                fullName={user?.fullName}
                width="w-10"
                height="h-10"
                style="text-lg bg-surface-container-highest text-primary border-2 border-primary"
              />
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {openSideMenu && (
        <div className="fixed inset-0 top-16 z-40 lg:hidden">
          {/* Overlay to close menu */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" onClick={() => setOpenSideMenu(false)}></div>
          
          {/* Menu Content */}
          <div className="relative w-64 h-full shadow-2xl transition-colors duration-300">
            <SideMenu activeMenu={activeMenu} isMobile={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;