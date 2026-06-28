import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <main className="relative z-10 w-full min-h-screen flex items-center justify-center p-container-padding">
      <div className="w-full max-w-[480px]">
        {/* Brand Identity */}
        <div className="text-center mb-section-margin space-y-2">
          <h1 className="font-display-lg text-display-lg font-bold text-primary tracking-tight">
            xpense-tracker
          </h1>
          <p className="text-on-surface-variant font-title-md text-title-md">
            Begin your premium financial journey
          </p>
        </div>
        
        {/* Registration/Login Card Container */}
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;