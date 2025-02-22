import React from 'react';
import { useTheme } from './ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function ToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 px-4 py-2 
                 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                 rounded-full shadow-md transition-all duration-300 ease-in-out
                 hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none
                 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300"
    >
      <div
        className={`w-6 h-6 flex items-center justify-center 
                    transition-transform duration-300 ease-in-out`}
      >
        {theme === 'light' ? (
          <SunIcon className="w-5 h-5 text-yellow-400 " />
        ) : (
          <MoonIcon className="w-5 h-5 text-blue-600 animate-pulse" />
        )}
      </div>
      <span className="font-medium">
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}

export default ToggleButton;
