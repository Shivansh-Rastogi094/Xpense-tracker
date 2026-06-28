import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ value, placeholder, onChange, label, type, icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="space-y-2 mb-4">
      {/* Label */}
      <label className={`font-label-sm text-label-sm uppercase flex items-center gap-2 transition-colors ${isFocused ? 'text-primary' : 'text-on-surface-variant'}`}>
        {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
        {label}
      </label>

      {/* Input Container */}
      <div className="relative flex items-center">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="input-glass w-full rounded-xl px-4 py-3 text-on-surface placeholder:text-outline/50 font-body-md text-body-md pr-10"
          value={value}
          onChange={(e) => onChange(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Password Toggle Icon */}
        {type === 'password' && (
          <div className="absolute right-3 flex items-center cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
            {showPassword ? (
              <FaRegEye size={18} onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={18} onClick={toggleShowPassword} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;