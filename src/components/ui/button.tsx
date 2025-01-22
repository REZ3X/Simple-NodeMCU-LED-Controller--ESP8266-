import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'solid';
}

/**
 * A customizable button component.
 *
 * @param {ButtonProps} props - The properties for the button component.
 * @param {'solid' | 'outline'} [props.variant='solid'] - The variant of the button, either 'solid' or 'outline'.
 * @param {string} [props.className] - Additional CSS classes to apply to the button.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @returns {JSX.Element} The rendered button component.
 */
export const Button: React.FC<ButtonProps> = ({ variant = 'solid', className, children, ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-lg shadow-lg transition duration-300';
  const variantClasses = variant === 'outline' ? 'border-2 border-gray-600' : 'bg-gray-600 text-white';

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};