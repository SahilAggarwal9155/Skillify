import React from "react";
import { Card, CardContent } from "./DashboardCard";

export const StatCard = ({
  title,
  value,
  icon,
  change,
  variant = "primary",
  prefix = "",
  suffix = "",
}) => {
  const variantClasses = {
    primary: "bg-indigo-50 text-indigo-600",
    success: "bg-green-50 text-green-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    info: "bg-blue-50 text-blue-600",
    neutral: "bg-gray-50 text-gray-600",
  };

  return (
    <Card className="transition-shadow duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-500">{title}</h3>
            <div className="mt-2 flex items-baseline">
              {prefix && (
                <span className="text-sm text-gray-400 mr-1">{prefix}</span>
              )}
              <span className="text-2xl font-semibold">{value}</span>
              {suffix && (
                <span className="text-sm text-gray-400 ml-1">{suffix}</span>
              )}
            </div>

            {change !== undefined && (
              <div className="mt-2">
                <span
                  className={change >= 0 ? "text-green-600" : "text-red-600"}
                >
                  {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  from last month
                </span>
              </div>
            )}
          </div>

          <div className={`p-3 rounded-full ${variantClasses[variant]}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
