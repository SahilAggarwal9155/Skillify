import React from "react";

const ProgressBar = ({
  progress,
  height = "md",
  color = "primary",
  showPercentage = false,
  className = "",
}) => {
  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-4",
  };

  const colorClasses = {
    primary: "bg-indigo-600",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
  };

  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full flex items-center ${className}`}>
      <div
        className={`flex-grow bg-gray-200 rounded-full overflow-hidden ${heightClasses[height]}`}
      >
        <div
          className={`${colorClasses[color]} transition-all duration-500 ease-out rounded-full ${heightClasses[height]}`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <span className="ml-2 text-xs font-medium text-gray-600">
          {Math.round(normalizedProgress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
