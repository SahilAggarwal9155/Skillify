import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  UserPlus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../../common/DashboardCard";
import { StatCard } from "../../common/StatCard";
import { Button } from "../../common/button";
import { AddInstructorForm } from "../../../features/teachers/pages/AddInstructorForm";
import ModalPage from "../../common/Modal";
import dashboardData from "../../../services/api/adminDashboard.json";

export const AdminDashboard = () => {
  const { adminAnalytics, courses, topInstructors } = dashboardData;
  const [showAddInstructor, setShowAddInstructor] = useState(true);
  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Platform Overview
          </h1>
          <div className="flex  gap-2">
            {showAddInstructor && (
              <ModalPage
                icon={
                  <Button
                    variant="outline"
                    className="!text-black"
                    size="lg"
                    leftIcon={<UserPlus size={16} />}
                    onClick={() => setShowAddInstructor(true)} // ✅ show modal on click
                  >
                    Add Instructor
                  </Button>
                }
                children={<AddInstructorForm  />}
              />
            )}
            <Button leftIcon={<BookOpen size={16} />}>Add Categories</Button>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Students"
            value={adminAnalytics.totalStudents}
            change={7.2}
            icon={<Users size={24} />}
            variant="primary"
          />
          <StatCard
            title="Total Revenue"
            value={adminAnalytics.totalRevenue}
            change={15.3}
            icon={<DollarSign size={24} />}
            variant="success"
            prefix="$"
          />
          <StatCard
            title="Active Courses"
            value={adminAnalytics.totalCourses}
            change={4.8}
            icon={<BookOpen size={24} />}
            variant="info"
          />
          <StatCard
            title="Completion Rate"
            value={adminAnalytics.courseCompletionRate}
            change={1.4}
            icon={<TrendingUp size={24} />}
            variant="warning"
            suffix="%"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader className="border-b">
              <h2 className="text-xl font-semibold">Top Performing Courses</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {courses.slice(0, 5).map((course, index) => (
                  <div key={index} className="flex items-center p-4">
                    <div className="font-bold text-gray-500 mr-4 w-6 text-center">
                      {index + 1}
                    </div>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-12 h-12 object-cover rounded mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-gray-600">
                        {course.instructor}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${course.price}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users size={14} className="mr-1" />
                        {course.enrolled}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Link
                to="/courses"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View all courses
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="border-b">
              <h2 className="text-xl font-semibold">Top Instructors</h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {topInstructors.map((instructor, index) => (
                  <div key={index} className="flex items-center p-4">
                    <div className="font-bold text-gray-500 mr-4 w-6 text-center">
                      {index + 1}
                    </div>
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        instructor.name
                      )}&background=random`}
                      alt={instructor.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{instructor.name}</p>
                      <p className="text-sm text-gray-600">
                        {instructor.course}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {instructor.totalCourses} Courses
                      </p>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users size={14} className="mr-1" />
                        {instructor.students} Students
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <Link
                to="/instructors"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View all instructors
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
