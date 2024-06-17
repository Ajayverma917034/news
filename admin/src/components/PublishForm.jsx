import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "./Tags.jsx";
import { EditorContext } from "../pages/Editor.jsx";
import { UserContext } from "../App.jsx";
import lightBanner from "../assets/news banner.png";
import Section from "./NewsSection.jsx";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { findHindi, stateDistricts } from "../common/data.js";
import { CategoryData } from "../assets/CategoryData.js";

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
      description,
      content,
      state,
      district,
      location,
      news_section_type,
      breaking_news,
    },
    setEditorState,
    setBlog,
    blog,
  } = useContext(EditorContext);

  const [tagdata, setTagData] = useState("");

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
      setTagData("");
    }
  };

  const handleSectionChange = (e) => {
    const newSection = e.target.value;
    console.log(newSection);
    setBlog({ ...blog, news_section_type: [...news_section_type, newSection] });
  };

  const handlePublish = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("Write News Title befor publising");
    }
    if (!description || description.length > charLength)
      return toast.error(
        `Write a description about your news within ${charLength} characters to publish`
      );
    if (!tags || tags.length > 10) {
      return toast.error(
        ` Write some tags about news within ${tagLimit} tag limit to publish`
      );
    }

    let loadingToast = toast.loading("Publishing...");

    let blogObj = {
      title,
      banner,
      description,
      content,
      tags,
      state,
      district,
      location,
      news_section_type,
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
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        // console.log(response.data.message);
        return toast.error(response.data.message);
      });
  };

  const states = Object.keys(stateDistricts).map((state) => ({
    english: state,
  }));
  const handleTag = () => {
    // e.preventDefault();
    let tag = tagdata;
    // let tag = e.target.value;
    setTagData(tag);
    if (tags?.length < tagLimit) {
      if (!tags.includes(tag) && tag.length) {
        setBlog({ ...blog, tags: [...tags, tag] });
      }
    } else {
      toast.error(`You can add max ${tagLimit} tags`);
    }
    setTagData("");
    // e.target.value = "";
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
        <p className="line-clamp-3 text-xl leading-7 mt-4">{description}</p>
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

        <p className="text-dark-grey mb-2 mt-9 required-text">
          Short description about your news
        </p>
        <textarea
          maxLength={charLength}
          defaultValue={description}
          className="h-40 resize-none leading-7 input-box pl-4"
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          onKeyDown={(e) => {
            if (e.keyCode === 13) e.preventDefault();
          }}
        ></textarea>
        <p className="mt-1 text-dark-grey text-sm text-right">
          {charLength - description?.length} characters left
        </p>

        <p className="text-dark-grey mb-2 mt-9 required-text">
          Topics - ( Helps in searching and ranking your news post )
        </p>
        <div className="relative  input-box pl-2 py-2 pb-4">
          <div className="flex items-center">
            <input
              type="text"
              value={tagdata}
              placeholder="Topics"
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setTagData(e.target.value);
              }}
              className="sticky input-box bg-white top-0 lef0 pl-4  focus:bg-white"
            />
            <button className="ml-2" onClick={handleTag}>
              <IoIosAddCircle
                size={25}
                className="text-dark-grey pointer-events-none"
              />
            </button>
          </div>
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
              value={state}
              className="input-box mb-5 pl-4 capitalize"
              onChange={(e) => setBlog({ ...blog, state: e.target.value })}
            >
              <option value="" defaultValue={state}>
                Select State
              </option>
              {states.map((state, i) => {
                return (
                  <option key={i} value={state.english} className=" capitalize">
                    {findHindi(state.english)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="">
            <p className=" mb-2 mt-9">Choose District</p>
            <select
              name="district"
              value={district}
              id="district"
              className="input-box mb-5 pl-4 capitalize"
              onChange={(e) => setBlog({ ...blog, district: e.target.value })}
            >
              <option value="" defaultValue={state}>
                Select State
              </option>
              {stateDistricts[state] &&
                stateDistricts[state].map((district, i) => {
                  return (
                    <option
                      key={i}
                      value={district.english}
                      className=" capitalize"
                    >
                      {district.hindi}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
          <div className="">
            <p className=" mb-2 mt-9 required-text">
              Enter the location of news
            </p>
            <input
              type="text"
              placeholder="News Location"
              value={location}
              className="input-box pl-4"
              onChange={(e) => setBlog({ ...blog, location: e.target.value })}
            />
          </div>
          <div className="mt-10 flex flex-col ml-2 ">
            <div className="flex  items-center gap-2 mt-4">
              <div>
                <input
                  type="checkbox"
                  checked={breaking_news}
                  onChange={(e) =>
                    setBlog({ ...blog, breaking_news: e.target.checked })
                  }
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <p className=" mb-[5px]  sm:text-[14px] ">
                {" "}
                Add to Breaking News
              </p>
            </div>
            {/* <div className="flex items-center gap-2">
              <div>
                <input
                  type="checkbox"
                  checked={breaking_news}
                  onChange={(e) =>
                    setBlog({ ...blog, breaking_news: e.target.checked })
                  }
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <p className=" mb-[5px] sm:text-[14px] ">
                Add to Read also section
              </p>
            </div>
            <div className="flex  items-center gap-2">
              <div>
                <input
                  type="checkbox"
                  checked={breaking_news}
                  onChange={(e) =>
                    setBlog({ ...blog, breaking_news: e.target.checked })
                  }
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <p className=" mb-[5px] sm:text-[14px] ">Add to Health Tips</p>
            </div> */}
          </div>
        </div>
        <p className="text-dark-grey mb-2 mt-9 required-text">
          News Section - ( Choose the news sections )
        </p>
        <div className="relative input-box pl-2 py-2 pb-4">
          {
            <select
              name="news-section"
              id="news-section"
              onChange={handleSectionChange}
              className="input-box mb-5 pl-4 capitalize"
            >
              <option value="">Select News Section</option>
              {CategoryData.map((category, i) => {
                return (
                  <option
                    key={i}
                    value={category.hindi}
                    className=" capitalize"
                  >
                    {category.hindi}
                  </option>
                );
              })}
            </select>
          }

          {/* Add more options as needed */}

          {news_section_type &&
            news_section_type.map((tag, i) => {
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
