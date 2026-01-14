import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, placeholder, onChange, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {/* Label */}
      <label className="text-[13px] font-medium block mb-1 text-stormy-500 dark:text-pearl-600">
        {label}
      </label>

      {/* Input Container */}
      <div className="
        flex items-center px-3 py-2.5 rounded-xl border transition-all duration-200
        bg-alice-500 border-alice-200 
        focus-within:border-stormy-500 focus-within:ring-1 focus-within:ring-stormy-500
        dark:bg-stormy-300 dark:border-stormy-400
        dark:focus-within:border-pearl-500 dark:focus-within:ring-pearl-500
      ">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="
            w-full bg-transparent outline-none text-sm font-medium
            text-stormy-500 placeholder:text-stormy-300
            dark:text-alice-500 dark:placeholder:text-stormy-400
          "
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Password Toggle Icon */}
        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-stormy-500 dark:text-pearl-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-stormy-300 dark:text-stormy-400 cursor-pointer hover:text-stormy-500 transition-colors"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;