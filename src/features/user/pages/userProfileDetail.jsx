import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { EditOutlined } from "@ant-design/icons";

import { AvatarWithText } from "../../../components/common/AvatarGroup";
import Navbar from "../../../components/navbar";
import { useFirebase } from "../../../hooks/useFirebase";
import EditProfileModal from "./EditProfileModal";

const UserProfileDetail = () => {
  const reduxUser = useSelector((state) => state.user?.userDetails);
  const firebase = useFirebase();

  const [userData, setUserData] = useState({
    name: reduxUser?.displayName || "Guest User",
    email: reduxUser?.email || "guest@example.com",
    photoURL: reduxUser?.photoURL || null,
    about: "",
    skills: [],
    certificates: [],
    github: "",
    medium: "",
    twitter: "",
  });

  const [userDocId, setUserDocId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userData.email) return;
      try {
        const [userDoc] = await firebase.readUserFromFirestore(
          "users",
          "data.email",
          userData.email
        );
        if (userDoc) {
          setUserDocId(userDoc.id);
          const userDetail = userDoc?.data;
          if (userDetail) {
            setUserData((prev) => ({
              ...prev,
              name: userDetail.displayName || prev.name,
              photoURL: userDetail.photoURL || prev.photoURL,
              about: userDetail.about || "",
              skills: userDetail.skills || [],
              certificates: userDetail.certificates || [],
              github: userDetail.github || "",
              medium: userDetail.medium || "",
              twitter: userDetail.twitter || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      }
    };
    fetchUserData();
  }, [userData.email, firebase]);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleProfileUpdate = async (values) => {
    setIsUpdating(true);
    try {
      if (userDocId) {
        await firebase.UpdateUser("users", userDocId, {
          "data.displayName": values.name,
          "data.email": values.email,
          "data.about": values.about,
          "data.skills": values.skills,
          "data.certificates": values.certificates,
          "data.github": values.github,
          "data.medium": values.medium,
          "data.twitter": values.twitter,
        });

        setUserData({
          ...userData,
          name: values.name,
          email: values.email,
          about: values.about,
          skills: values.skills,
          certificates: values.certificates,
          github: values.github,
          medium: values.medium,
          twitter: values.twitter,
        });
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    } finally {
      setIsUpdating(false);
      setIsModalOpen(false);
    }
  };

  const userProfilePic = userData.photoURL ? (
    <img
      src={userData.photoURL}
      alt="User avatar"
      className="w-12 h-12 rounded-lg object-cover"
    />
  ) : (
    <AvatarWithText useremail={userData.email} />
  );

  const SectionTitle = ({ title, className = "" }) => (
    <h2
      className={`m-0 text-sm font-medium tracking-wider uppercase ${className}`}
    >
      {title}
    </h2>
  );

  const TagSection = ({ title, tags, variant = "primary" }) => {
    const colors =
      variant === "primary"
        ? "text-violet-700 bg-violet-700 bg-opacity-10"
        : "text-violet-400 bg-violet-400 bg-opacity-10";
    return (
      <section className="flex flex-col gap-4">
        <SectionTitle title={title} className="text-violet-400" />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-3 py-1.5 text-sm rounded-t-2xl rounded-bl-2xl text-white ${colors}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    );
  };

  const ProfileCard = () => (
    <section className="p-4 sm:p-6 md:p-10 bg-white text-zinc-800">
      <div className="flex flex-col gap-6 md:gap-8 mx-auto">
        <header className="flex flex-col gap-2 text-center md:text-left">
          <h1 className="m-0 text-xl md:text-2xl font-semibold">
            Profile Information
          </h1>
        </header>
        <article className="flex flex-col gap-4 p-4 sm:p-6 bg-gray-50 rounded-lg ">
          <section className="flex flex-col gap-2">
            <SectionTitle title="About Me" className="text-violet-700" />
            <p className="m-0 text-sm md:text-base leading-relaxed text-zinc-600">
              {userData.about || "No description provided."}
            </p>
          </section>
          <TagSection title="Skills" tags={userData.skills} variant="primary" />
          <TagSection
            title="Certificates"
            tags={userData.certificates}
            variant="secondary"
          />
        </article>
      </div>
    </section>
  );

  const socialButtons = [
    { name: "Github", url: userData.github },
    { name: "Twitter", url: userData.twitter },
    { name: "Medium", url: userData.medium },
  ];

  const SocialButtonDisplay = () => {
    return (
      <>
        <div className="flex gap-2">
          {socialButtons.map(({ name, url }) => (
            <button
              key={name}
              disabled={!url}
              onClick={() => {
                if (url) window.open(url, "_blank", "noopener noreferrer");
              }}
              className={`flex   gap-2 p-2 text-xs font-bold uppercase border rounded-lg transition ${
                url
                  ? "hover:bg-gray-50 text-gray-700 cursor-pointer"
                  : "bg-gray-200 text-gray-400 hidden cursor-not-allowed"
              }`}
            >
              <span>{name}</span>
            </button>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <section className="container mx-auto px-4 pb-4 ">
        <div className="relative flex flex-col bg-white  rounded-2xl shadow-lg overflow-hidden">
          <div className="relative md:h-60 w-full overflow-hidden">
            <img
              src="https://static.vecteezy.com/system/resources/previews/039/920/245/non_2x/artificial-intelligence-technology-facebook-cover-free-editor_template.jpeg"
              alt="Profile cover"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3 w-full">
                {userProfilePic}
                <div className="flex flex-1 min-w-0 flex-col gap-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {userData.name}
                  </h2>
                  <p className="text-sm text-gray-600 break-words truncate">
                    {userData.email}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-gray-500 hover:text-gray-700 transition ml-2"
                >
                  <EditOutlined />
                </button>
              </div>
              <SocialButtonDisplay />
            </div>
          </div>
        </div>
      </section>

      <ProfileCard />

      <EditProfileModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleProfileUpdate}
        initialValues={{
          name: userData.name,
          email: userData.email,
          about: userData.about,
          skills: userData.skills,
          certificates: userData.certificates,
          github: userData.github,
          medium: userData.medium,
          twitter: userData.twitter,
        }}
        loading={isUpdating}
      />
    </div>
  );
};

export default UserProfileDetail;
