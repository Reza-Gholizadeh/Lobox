import React from "react";

interface ChevronIconProps {
  isOpen: boolean;
  className?: string;
}

export const ChevronIcon: React.FC<ChevronIconProps> = ({
  isOpen,
  className = "",
}) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: `translateY(-50%) ${
          isOpen ? "rotate(180deg)" : "rotate(0deg)"
        }`,
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
