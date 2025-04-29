const TagGroup = ({ tags, position }) => {
  return (
    <div
      className={`flex flex-wrap ${
        position == "center" ? "justify-center" : ""
      } md:${
        position == "center" ? "justify-center" : "justify-start"
      } items-center`}
    >
      {tags.map((tag, index) => (
        <div
          key={index}
          className={`flex ${tag.bgColor || "bg-white"} ${
            tag.textColor || "text-black"
          } transition cursor-pointer rounded-full p-1 items-center`}
          onClick={() => {
            if (tag.onClick) {
              console.log("Tag clicked");
              tag.onClick();
            }
          }}
        >
          {tag.icon && (
            <p
              className={`${
                tag.iconColor || "bg-black primary-text"
              } center-circle hover:${tag.rotate} transition p-2`}
            >
              {tag.item}
            </p>
          )}
          {tag.text && <p className="p-1 px-2">{tag.text}</p>}
        </div>
      ))}
    </div>
  );
};

export default TagGroup;
