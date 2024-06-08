import React, { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "./Tags.jsx";
import { EditorContext } from "../pages/Editor.jsx";
import { UserContext } from "../App.jsx";
import lightBanner from "../assets/news banner.png";
import { findDistrict, states } from "../common/data.js";
import Section from "./NewsSection.jsx";
import { IoMdClose } from "react-icons/io";

const PublishForm = () => {
  const charLength = 200;
  const tagLimit = 10;
  const navigate = useNavigate();
  const { blog_id } = useParams();
  let {
    blog: {
      banner,
      title,
      tags,
      des,
      content,
      state,
      district,
      location,
      sections,
      breaking_news,
    },
    setEditorState,
    setBlog,
    blog,
  } = useContext(EditorContext);

  // console.log(blog);
  // let {userAuth: {access_token}} = useContext(UserContext)
  let {
    userAuth: { refreshToken },
  } = useContext(UserContext);
  const handleClose = () => {
    setEditorState("editor");
  };
  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleChooseState = (e) => {
    let input = e.target;
    setBlog({ ...blog, state: input.value });
  };
  const handleChooseDistrict = (e) => {
    let input = e.target;
    setBlog({ ...blog, district: input.value });
  };
  const handleLocation = (e) => {
    let input = e.target.value;
    setBlog({ ...blog, location: input.value });
  };
  const handleChooseTrending = (e) => {
    let input = e.target;
    setBlog({ ...blog, breaking_news: input.checked });
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags?.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags`);
      }
      e.target.value = "";
    }
  };

  const handleSectionChange = (e) => {
    const newSection = e.target.value;

    setBlog({ ...blog, sections: [...sections, newSection] });
  };

  const handlePublish = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("Write News Title befor publising");
    }
    if (!des || des.length > charLength)
      return toast.error(
        `Write a description about your news within ${charLength} characters to publish`
      );
    if (!tags || tags.length > 10) {
      return toast.error(
        `Write some tags about news within ${tagLimit} tag limit to publish`
      );
    }

    let loadingToast = toast.loading("Publishing...");

    let blogObj = {
      title,
      banner,
      description: des,
      content,
      tags,
      state,
      district,
      location,
      news_section_type: sections,
      breaking_news,
      draft: false,
    };
    e.target.classList.add("disable");
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
        ...blogObj,
        id: blog_id,
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Published successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        // console.log(response.data.message);
        return toast.error(response.data.message);
      });
  };
  return (
    <section className="w-full min-h-screen grid grid-cols-1 md:grid-cols-5 lg:gap-4 p-5 md:p-10 ">
      <button
        className="w-12 h-12 absolute right-[5vw] z-10 top-[6%] lg:top-[2%]"
        onClick={handleClose}
      >
        <IoMdClose size={20} className="text-sm pointer-events-none" />
      </button>
      <div className="max-w-[500px] center col-span-1 mt-3 md:col-span-2">
        <p className="text-dark-grey mb-1">Preview</p>
        <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
          <img src={banner} alt="Banner" />
        </div>
        <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
          {title}
        </h1>
        <p className="line-clamp-3 text-xl leading-7 mt-4">{des}</p>
      </div>
      <div className="border-grey lg:border-1 lg:pl-4 col-span-1 md:col-span-3">
        {/* <p className="text-dark-grey mb-2 mt-9">News Title</p>
          <input
            type="text"
            placeholder="News Title"
            defaultValue={title}
            className="input-box pl-4"
            onChange={handleBlogTitleChange}
          /> */}

        <p className="text-dark-grey mb-2 mt-9">
          Short description about your news
        </p>
        <textarea
          maxLength={charLength}
          defaultValue={des}
          className="h-40 resize-none leading-7 input-box pl-4"
          onChange={(e) => setBlog({ ...blog, des: e.target.value })}
          onKeyDown={(e) => {
            if (e.keyCode === 13) e.preventDefault();
          }}
        ></textarea>
        <p className="mt-1 text-dark-grey text-sm text-right">
          {charLength - des?.length} characters left
        </p>

        <p className="text-dark-grey mb-2 mt-9">
          Topics - ( Helps in searching and ranking your news post )
        </p>
        <div className="relative input-box pl-2 py-2 pb-4">
          <input
            type="text"
            placeholder="Topics"
            onKeyDown={handleKeyDown}
            className="sticky input-box bg-white top-0 lef0 pl-4 mb-3 focus:bg-white"
          />
          {tags &&
            tags.map((tag, i) => {
              return <Tag key={i} tagIndex={i} tag={tag} />;
            })}
        </div>
        <p className="mt-1 pt-1 mb-4 text-dark-grey text-right ">
          {tagLimit - tags?.length} Tags left
        </p>

        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
          <div className="">
            <p className=" mb-2 mt-9">Choose the State</p>
            <select
              name="state"
              id="state"
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm"
              onChange={(e) => setBlog({ ...blog, state: e.target.value })}
            >
              <option value="">Select State</option>
              {states.map((state, i) => (
                <option key={i} value={state.english} className=" capitalize">
                  {state.english}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <p className=" mb-2 mt-9">Choose District</p>
            <select
              name="district"
              id="district"
              className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue sm:text-sm"
              onChange={(e) => setBlog({ ...blog, district: e.target.value })}
            >
              <option value="">Select State</option>
              {findDistrict("uttar pradesh").map((state, i) => (
                <option key={i} value={state.english} className=" capitalize">
                  {state.english}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
          <div className="">
            <p className=" mb-2 mt-9">Enter the location of news</p>
            <input
              type="text"
              placeholder="News Location"
              className="input-box pl-4"
              onChange={(e) => setBlog({ ...blog, location: e.target.value })}
            />
          </div>
          <div className="">
            <p className=" mb-2 mt-9">Do you want to add it in Breaking News</p>
            <input
              type="checkbox"
              checked={breaking_news}
              onChange={(e) =>
                setBlog({ ...blog, breaking_news: e.target.checked })
              }
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>
        </div>
        <p className="text-dark-grey mb-2 mt-9">
          News Section - ( Choose the news sections )
        </p>
        <div className="relative input-box pl-2 py-2 pb-4">
          <select
            name="news-section"
            id="news-section"
            onChange={handleSectionChange}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="sport">Sport</option>
            <option value="politics">Politics</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
            {/* Add more options as needed */}
          </select>
          {sections &&
            sections.map((tag, i) => {
              return <Section key={i} tagIndex={i} tag={tag} />;
            })}
        </div>
        <button onClick={handlePublish} className="btn-dark px-8 my-4">
          Publish
        </button>
      </div>
    </section>
  );
};

export default PublishForm;
