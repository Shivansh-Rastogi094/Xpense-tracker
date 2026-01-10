import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
// import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <aside
      className="
        w-64 
        h-[calc(100vh-61px)] 
        bg-white 
        border-r 
        border-gray-200/60 
        sticky 
        top-[61px] 
        z-20
        flex 
        flex-col
      "
    >
      {/* ===== User Profile ===== */}
      <div className="flex flex-col items-center text-center px-5 py-6 border-b border-gray-200/60">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl||""}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover bg-gray-300 shadow-sm"
          />
        ) : (<CharAvatar
            fullName={user?.fullName}
            width="w-20"
            height="h-20"
            style="text-xl"
            />)}

        <h5 className="mt-3 text-gray-900 font-semibold leading-tight">
          {user?.fullName || "User"}
        </h5>
        <p className="text-sm text-gray-500 mt-1">Welcome back</p>
      </div>

      {/* ===== Menu Items ===== */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive =
            activeMenu === item.label || location.pathname === item.path;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`
                w-full 
                flex 
                items-center 
                gap-4 
                px-4 
                py-3 
                mb-2 
                rounded-lg 
                text-[15px] 
                font-medium
                transition-all 
                duration-200
                ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <item.icon
                className={`
                  text-xl 
                  shrink-0
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-700"
                  }
                `}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===== Footer (Optional) ===== */}
      <div className="px-5 py-4 border-t border-gray-200/60 text-xs text-gray-400">
        © {new Date().getFullYear()} Dashboard
      </div>
    </aside>
  );
};

export default SideMenu;
