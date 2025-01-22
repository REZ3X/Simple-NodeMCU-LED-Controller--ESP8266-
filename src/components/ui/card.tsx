import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div className={`p-4 rounded-lg shadow-lg ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children, ...props }) => {
  return (
    <div className={`pb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({ className, children, ...props }) => {
  return (
    <div className={`pt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * A functional component that renders a styled `<h2>` element.
 * 
 * @component
 * @param {CardTitleProps} props - The props for the component.
 * @param {string} props.className - Additional class names to apply to the `<h2>` element.
 * @param {React.ReactNode} props.children - The content to be displayed inside the `<h2>` element.
 * @returns {JSX.Element} The rendered `<h2>` element with the specified styles and content.
 */
export const CardTitle: React.FC<CardTitleProps> = ({ className, children, ...props }) => {
  return (
    <h2 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
};