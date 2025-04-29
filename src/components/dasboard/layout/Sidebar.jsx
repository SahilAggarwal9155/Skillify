import React from "react";
import {
  BookOpen,
  Users,
  Award,
  LogOut,
  Home,
  BookMarked,
  GraduationCap,
  User,
  Bookmark,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../../features/user/pages/userProfileSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user?.userDetails);

  const role = reduxUser.role;

  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/",
      roles: ["student", "teacher", "admin"],
    },
    {
      title: "My Courses",
      icon: <BookOpen size={20} />,
      path: "/my-courses",
      roles: ["student"],
    },
    {
      title: "Bookmarks",
      icon: <Bookmark size={20} />,
      path: "/bookmarks",
      roles: ["student"],
    },
    {
      title: "Certificates",
      icon: <Award size={20} />,
      path: "/certificates",
      roles: ["student"],
    },
    {
      title: "My Profile",
      icon: <User size={20} />,
      path: "/profile",
      roles: ["student", "teacher"],
    },

    {
      title: "My Courses",
      icon: <BookMarked size={20} />,
      path: "/manage-courses",
      roles: ["teacher"],
    },
    {
      title: "Students",
      icon: <GraduationCap size={20} />,
      path: "/students",
      roles: ["teacher"],
    },

    {
      title: "All Courses",
      icon: <BookOpen size={20} />,
      path: "/courses",
      roles: ["admin"],
    },
    {
      title: "Instructors",
      icon: <Users size={20} />,
      path: "/instructors",
      roles: ["admin"],
    },
    {
      title: "Students",
      icon: <Users size={20} />,
      path: "/students",
      roles: ["admin"],
    },
  ];

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role));

  const getRoleColor = () => {
    switch (role) {
      case "student":
        return "bg-indigo-700 from-indigo-700 to-indigo-800";
      case "teacher":
        return "bg-teal-700 from-teal-700 to-teal-800";
      case "admin":
        return "bg-amber-700 from-amber-700 to-amber-800";
      default:
        return "bg-gray-800 from-gray-800 to-gray-900";
    }
  };

  const logout = () => {
    dispatch(clearUserData());
    console.log("Logged out");
  };

  return (
    <div className={`h-full ${getRoleColor()} text-white flex flex-col`}>
      <div className="flex items-center justify-center h-16 px-4">
        <span className="ml-2 text-xl font-bold">Skillify</span>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="px-2 py-4 space-y-1">
          {filteredNavItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center px-4 py-3 rounded-lg transition-colors duration-150
                    ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition-colors duration-150"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
