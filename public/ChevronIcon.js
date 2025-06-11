import React from 'react';

const ChevronIcon = ({ className = "", fill = "currentColor", size = 24, ...props }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      fill={fill}
    />
  </svg>
);

export default ChevronIcon;