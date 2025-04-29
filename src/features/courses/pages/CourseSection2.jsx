import { HeadingDescription } from "../../../components/common/HeadingDescriptionText";
import TagSingle from "../../../components/common/TagSingle";
import CardWithImage from "../../../components/common/CardWithImage";
import { Button } from "../../../components/common/button";
import LaptopOutlined from "@ant-design/icons/LaptopOutlined";

export default function CourseSection2() {
  const MasterClass = () => {
    return (
      <div className="flex flex-col gap-3 p-2">
        <div>
          <h3 className="font-semibold text-[var(--color-dark-lavender)]">
            Tuesday, Apr 29 at 10:00 AM
          </h3>
        </div>
        <div>
          <p className="text-[var(--color-charcol-black)] font-semibold text-[1.2rem]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit,
            facere?
          </p>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex  gap-2">
            <span>
              <LaptopOutlined />
            </span>
            <div>
              <h1>By Dr. John Doe</h1>
              <p>Professor And Dean | IIIT Bangalore</p>
            </div>
          </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTdMfGt8m2fOLQt3OZb5AgoKzHbWwjTCditg&s"
            alt="IIT"
            className=" h-[2rem] w-[2rem]"
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <Button className=" w-full bg-transparent !text-black border-1 text-[12px]">
            View Masterclass
          </Button>
          <Button className="w-full !bg-black text-[12px]">Register Now</Button>
        </div>
      </div>
    );
  };
  return (
    <>
      {/* Platform Section */}
      <div className="flex flex-wrap md:flex-nowrap gap-7 items-center justify-evenly mx-auto">
        <div className="left-section max-w-[30rem] m-5 p-3 ">
          <HeadingDescription className="!text-[var(--color-primary-blue);] text-center xl:w-max sm:text-left font-semibold ">
            Attend{" "}
            <span className="text-[var(--color-dark-lavender)]">
              free masterclasses
            </span>{" "}
            by industry experts
          </HeadingDescription>
          <h6 className="text-[1rem] text-[var(--secondry-text-Lightblue)] mt-6 mx-auto mr-2 text-justify mb-6">
            We offer the highest quality education resources an individual
            approach to each student and modern technologies to make learning
            accessible & effective
          </h6>
          <TagSingle textContent={"View All Masterclass"} />
        </div>
        <div className="flex flex-wrap max-w-[25rem] gap-1 justify-center items-center  m-5 ">
          <CardWithImage
            image="https://www.upgrad.com/_ww3-next/image/?url=%20https%3A%2F%2Fd2o2utebsixu4k.cloudfront.net%2F400x200-2%20copy-4110e9d107c44fb98fe2c9e346185889.webp&w=1200&q=75"
            imageStyle={"object-cover  max-h-[13rem] "}
            children={<MasterClass />}
            className="flex-col !shadow-xl !border-none"
          />
        </div>
      </div>
    </>
  );
}
