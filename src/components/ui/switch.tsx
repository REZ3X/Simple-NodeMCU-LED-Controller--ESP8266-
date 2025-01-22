import React from 'react';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

/**
 * A switch component that acts as a toggle button.
 *
 * @param {boolean} checked - Indicates whether the switch is in the "on" position.
 * @param {(checked: boolean) => void} onCheckedChange - Callback function to handle the change in switch state.
 * @param {string} [className] - Optional additional class names to style the switch component.
 *
 * @returns {JSX.Element} The rendered switch component.
 */
export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  );
};