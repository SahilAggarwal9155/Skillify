import { useRef } from "react";
import Navbar from "../components/navbar/index";
import ContentSection from "../components/common/ContentSection";
import Cards from "../components/common/card";
import { responsiveFlex } from "../styles/responsiveFlex";
import CourseSection2 from "../features/courses/pages/CourseSection2";
import CoursesDisplay from "../features/courses/pages/coursesDisplay";

import {
  responsiveTextH6,
  responsiveTextBodyLarge,
  responsiveTextH1,
} from "../styles/responsiveText";
import ProgressBar from "../components/common/ProgressBar";
import { AvatarGroup } from "../components/common/AvatarGroup";
import CountingNumber from "../components/common/CountingNumber";

const Home = () => {
  const sectionRef = useRef(null); // 1. Create a reference
  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" }); // 2. Scroll into view
  };

  const sections = [
    {
      leftContent:
        "Personalized recommendations for each student, based on their learning style and preferences.",
      biggerText: "Simple",
      tags: [
        { icon: true, text: "advantage", item: "#" },
        { icon: true, bgColor: "transparent", item: "#" },
        {
          icon: true,
          item: "#",
          bgColor: "transparent",
          iconColor: "border border-white primary-text",
        },
      ],
    },
    {
      reverse: true,
      biggerText: "Powerful",
      rightContent: (
        <Cards className="hidden sm:block">
          {" "}
          <div>
            <div>
              <h3 className="text-black text-2xl mx-auto text-start max-w-[40rem] mb-5">
                Active Now
              </h3>
              <ProgressBar />
            </div>
            <div className="absolute top-12  right-[-7rem]">
              <AvatarGroup />
            </div>
          </div>{" "}
        </Cards>
      ),
    },
    {
      leftContent:
        "we offer the highest quality educational resources to make learning accessible",
      biggerText: "EdTech",
      tags: [
        { text: "Get started", onClick: handleScroll },
        {
          icon: true,
          bgColor: "transparent",
          rotate: "rotate-90",
          item: <>&#8599;</>,
        },
      ],
    },
    {
      reverse: true,
      leftContent: <Cards />,
      biggerText: "Solutions",
      actionText: <>&#8618;</>,
    },
  ];

  const smallAboutus = [
    {
      text: (
        <div className="flex items-center">
          +<CountingNumber maxnumber={80} timer={20} />
        </div>
      ),
      description: "Online Courses",
    },
    {
      text: <CountingNumber maxnumber={10} timer={100} />,
      description: "Years Experience",
    },
    {
      text: <CountingNumber maxnumber={77} timer={20} />,
      description: "Top Mentors",
    },
  ];
  const achieveData = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e13888bfb8ff08a67b95eba8721ce071e86065d8c550324be1f8e29697d2a586?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Learn latest skills",
      description:
        "Learn new skills like Project management, AWS, Security or anything that matters to you in your industry. New skills translate to new opportunities.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/dadc5fed5ab197a2a006bfe7ff4adff495f7aa0fa76bc36478d2b47884aa3ace?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Upgrade your skills",
      description:
        "Upskill your current skillsets to the latest trends, developments or new versions. Stay at fore-front, current and relevant in the ever changing world of skills.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/54ecde977ac2e1733aa3a7c80783b77c22b9fa098996ce3882be83159defd4a7?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Further your career",
      description:
        "Don't let your previous skills become the bottleneck of your career growth in today's fast-changing skill demands. Upgrade your skills today.",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d998ce4a1565c48cb9d7f2c33948f0574978643c665ed8c55d69172b6177fbec?apiKey=c0bca91966db4095b1e1b5a08f720e3b&",
      title: "Upskill your team",
      description:
        "With our tailored training approaches, give your team the latest skillsets needed for the optimum productivity; stay ahead of the competition.",
    },
  ];

  return (
    <div>
      <div className="lavender-background">
        <Navbar />

        {/* Main Top Content */}
        <div className="p-4 md:p-8 ">
          {sections.map((section, index) => (
            <ContentSection
              key={index}
              reverse={section.reverse}
              leftContent={section.leftContent}
              rightContent={section.rightContent}
              biggerText={section.biggerText}
              tags={section.tags}
              actionText={section.actionText}
            />
          ))}
        </div>
      </div>

      {/* About Us */}

      <div
        className={` ${responsiveFlex}  bg-[var(--color-charcol-black);] text-white p-6  md:p-8 gap-4 md:gap-8`}
      >
        <div className="w-full md:w-1/2 flex flex-col gap-4 md:gap-8">
          <div>
            <h1 className={` text-3xl ${responsiveTextH1} sm:!text-5xl `}>
              About us
            </h1>
          </div>
          <div className={` ${responsiveFlex}`}>
            <div className={`${responsiveFlex} !flex-row gap-10`}>
              {smallAboutus.map((item, index) => (
                <div className="flex flex-col items-center" key={index}>
                  <span
                    className={` !text-2xl  ${responsiveTextH6} text-[var(--color-dark-lavender)]  `}
                  >
                    {item.text}
                  </span>
                  <p className="flex text-[13px] sm:text-[18px] text-center">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <p
            className={`  ${responsiveTextBodyLarge} text-center sm:text-left `}
          >
            At skillify, we offer comprehensive English language courses
            tailored to your personal and professional growth. Whether you're a
            beginner or seeking advanced fluency. our dynamic lessons will help
            you speak, write, and understand English with confidence.
          </p>
        </div>
      </div>

      <section className="achieve_section my-4">
        <div className="content_wrapper">
          <div className="title_wrapper">
            <h2 className="title flex gap-2 ">
              <span className="title-primary text-3xl sm:text-5xl text-[var(--color-primary-blue);]">
                Achieve with{" "}
              </span>
              <span className="title-secondary text-3xl sm:text-5xl text-[var(--color-dark-lavender)]">
                {" "}
                Skillify
              </span>
            </h2>
          </div>
          <div className="achieve_items_wrapper">
            {achieveData?.map((item, index) => (
              <div className="achieve_item" key={index}>
                <div className="icon_wrapper">
                  <img src={item.icon} alt="" />
                </div>
                <h3 className="achieve_title text-[var(--color-primary-blue);]">
                  {item.title}
                </h3>
                <p className="achieve_description  text-[var(--secondry-text-Lightblue)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CourseSection2 />

      <div className="divider"></div>
      <div className="CourseDisplay" ref={sectionRef}>
        <CoursesDisplay />
      </div>
    </div>
  );
};

export default Home;
