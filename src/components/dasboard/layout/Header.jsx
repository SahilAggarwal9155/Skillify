import React from "react";
import { X, AlignLeft } from "lucide-react";
import { Badge } from "../../common/Badge";
import { Button } from "../../common/button";
import { useSelector } from "react-redux";

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  const reduxUser = useSelector((state) => state.user?.userDetails);
  const role = reduxUser.role;

  const getHeaderTitle = () => {
    switch (role) {
      case "student":
        return "Student Dashboard";
      case "teacher":
        return "Teacher Dashboard";
      case "admin":
        return "Admin Dashboard";
      default:
        return "Dashboard";
    }
  };

  const getRoleBadgeVariant = () => {
    switch (role) {
      case "student":
        return "primary";
      case "teacher":
        return "success";
      case "admin":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden !text-black"
              onClick={onToggleSidebar}
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={20} /> : <AlignLeft size={20} />}
            </Button>
            <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
              {getHeaderTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative inline-block text-left">
              <div className="flex items-center">
                <div className="ml-3  md:block">
                  <p className="text-sm font-medium text-gray-700">
                    {" "}
                    {reduxUser?.username}{" "}
                  </p>
                  <div className="flex items-center">
                    <Badge variant={getRoleBadgeVariant()}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
