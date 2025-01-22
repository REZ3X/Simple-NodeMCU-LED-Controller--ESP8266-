import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number[];
  onValueChange: (value: number[]) => void;
  max?: number;
  step?: number;
}

/**
 * Slider component that renders an HTML range input element.
 *
 * @param {SliderProps} props - The properties for the Slider component.
 * @param {number[]} props.value - The current value of the slider.
 * @param {function} props.onValueChange - Callback function to handle value changes.
 * @param {number} [props.max=100] - The maximum value of the slider.
 * @param {number} [props.step=1] - The step increment of the slider.
 * @param {string} [props.className] - Additional CSS classes for the slider.
 * @param {object} [props.props] - Additional properties passed to the input element.
 *
 * @returns {JSX.Element} The rendered slider component.
 */
export const Slider: React.FC<SliderProps> = ({ value, onValueChange, max = 100, step = 1, className, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([Number(event.target.value)]);
  };

  return (
    <input
      type="range"
      value={value[0]}
      onChange={handleChange}
      max={max}
      step={step}
      className={`w-full ${className}`}
      {...props}
    />
  );
};