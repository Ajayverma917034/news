import { IoMdClose } from "react-icons/io";

const Tag = ({ tag, tagIndex, ytData, setYtData }) => {
  let { tags } = ytData;
  const handleDeleteTag = () => {
    tags = tags.filter((t) => t !== tag);
    setYtData({ ...ytData, tags });
  };
  const handleTagEdit = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let currentTag = e.target.innerText;
      tags[tagIndex] = currentTag;
      setYtData({ ...ytData, tags });
      e.target.setAttribute("contentEditable", false);
    }
  };
  const addEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };
  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-50 pr-10 border border-[#f5f1f1]">
      <p
        className="outline-none"
        onClick={addEditable}
        onKeyDown={handleTagEdit}
      >
        {tag}
      </p>
      <button
        onClick={handleDeleteTag}
        type="button"
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
      >
        <IoMdClose size={20} className="text-sm pointer-events-none" />
      </button>
    </div>
  );
};

export default Tag;
