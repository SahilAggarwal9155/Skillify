import React from "react";
import { Card } from "../common/DashboardCard";
import { Badge } from "../common/Badge";
import ProgressBar from "./ui/Progressbar";
import { Button } from "../common/button";
import { Clock, Users, Star } from "lucide-react";

export const CourseCard = ({ course, variant = "full", role = "student" }) => {
  const isStudent = role === "student";
  const isTeacher = role === "teacher";
  const isAdmin = role === "admin";

  const getCategoryBadgeVariant = (category) => {
    const categories = {
      Programming: "primary",
      "Web Development": "info",
      Design: "secondary",
      "Data Science": "success",
      Business: "warning",
      Marketing: "danger",
    };

    return categories[category] || "primary";
  };

  const getStatusBadgeVariant = (status) => {
    const statuses = {
      published: "success",
      draft: "warning",
      archived: "danger",
    };

    return statuses[status] || "primary";
  };

  if (variant === "compact") {
    return (
      <div className="hover:-translate-y-1 transition-transform duration-200">
        <Card className="overflow-hidden h-full">
          <div className="flex flex-col h-full">
            <div className="relative h-32 bg-gray-200">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-medium line-clamp-1">
                  {course.title}
                </h3>
                {course.rating && (
                  <div className="flex items-center">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="ml-1 text-sm">{course.rating}</span>
                  </div>
                )}
              </div>
              {isStudent && course.progress !== undefined && (
                <div className="mt-2">
                  <ProgressBar
                    progress={course.progress}
                    showPercentage
                    color={course.progress > 75 ? "success" : "primary"}
                  />
                </div>
              )}
              {(isTeacher || isAdmin) && (
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <Users size={16} className="mr-1" />
                  <span>{course.enrolled} students</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="hover:-translate-y-1 transition-transform duration-200">
      <Card className="overflow-hidden h-full">
        <div className="flex flex-col h-full">
          <div className="relative h-48 bg-gray-200">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge variant={getCategoryBadgeVariant(course.category)}>
                {course.category}
              </Badge>
            </div>
            {(isTeacher || isAdmin) && (
              <div className="absolute top-2 left-2">
                <Badge variant={getStatusBadgeVariant(course.status)}>
                  {course.status}
                </Badge>
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-medium mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-gray-600 text-sm">
                <Clock size={16} className="mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="ml-1 text-sm">{course.rating}</span>
              </div>
            </div>

            {isStudent && course.progress !== undefined && (
              <div className="mt-2 mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <ProgressBar
                  progress={course.progress}
                  color={
                    course.progress > 75
                      ? "success"
                      : course.progress > 25
                      ? "primary"
                      : "warning"
                  }
                />
              </div>
            )}

            {(isTeacher || isAdmin) && (
              <div className="flex items-center mt-2 mb-4 text-sm text-gray-600">
                <Users size={16} className="mr-1" />
                <span>{course.enrolled} enrolled students</span>
              </div>
            )}

            <div className="mt-auto pt-4 flex justify-between items-center">
              {course.price > 0 ? (
                <div className="text-lg font-bold">
                  ${course.price.toFixed(2)}
                </div>
              ) : (
                <div className="text-lg font-bold text-green-600">Free</div>
              )}

              <Button variant={isStudent ? "primary" : "outline"} size="sm">
                {isStudent ? "Continue" : "View Details"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
