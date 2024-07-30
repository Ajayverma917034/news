import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Tag from "./Tags.jsx";
import { EditorContext } from "../pages/Editor.jsx";
import Section from "./NewsSection.jsx";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircle } from "react-icons/io";
import { districts, findHindi, stateDistricts } from "../common/data.js";
import { CategoryData } from "../assets/CategoryData.js";
import { handleImageError } from "../common/imageError.js";

const PublishForm = () => {
  const charLength = 200;
  const tagLimit = 10;
  const navigate = useNavigate();
  const { news_id } = useParams();
  const {
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
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(true); // Set this to true whenever there's a change
  }, [
    title,
    description,
    tags,
    state,
    district,
    location,
    news_section_type,
    breaking_news,
  ]);

  useEffect(() => {
    if (!hasChanges) return; // Only auto-save if there are changes

    const autoSave = () => {
      if (
        title.length &&
        description.length <= charLength &&
        tags.length <= tagLimit
      ) {
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
          draft: true,
        };
        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
            ...blogObj,
            id: news_id,
          })
          .then(() => {
            setHasChanges(false); // Reset the change tracker after successful save
          })
          .catch(({ response }) => {
            return toast.error(response?.data?.error);
          });
      }
    };

    const intervalId = setInterval(autoSave, 5000);

    return () => clearInterval(intervalId);
  }, [
    hasChanges,
    title,
    description,
    tags,
    state,
    district,
    location,
    news_section_type,
    breaking_news,
    news_id,
  ]);

  const handleClose = () => {
    setEditorState("editor");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.target.value;
      if (tags?.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
          setHasChanges(true); // Mark as changed
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags`);
      }
      setTagData("");
    }
  };

  const handleSectionChange = (e) => {
    const newSection = e.target.value;
    setBlog({ ...blog, news_section_type: [...news_section_type, newSection] });
    setHasChanges(true); // Mark as changed
  };

  const handlePublish = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("Write News Title before publishing");
    }
    if (!description || description.length > charLength)
      return toast.error(
        `Write a description about your news within ${charLength} characters to publish`
      );
    if (!tags.length || tags.length > 10) {
      return toast.error(
        ` Write some tags about news within ${tagLimit} tag limit to publish`
      );
    }
    if (!state && !news_section_type.length && !district) {
      return toast.error(
        `Please choose the state or district or the news section of the news`
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
        id: news_id,
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Published successfully");
        navigate("/dashboard/all-news");
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        return toast.error(response?.data?.error);
      });
  };

  const states = Object.keys(stateDistricts).map((state) => ({
    english: state,
  }));

  const handleTag = () => {
    let tag = tagdata;
    setTagData(tag);
    if (tags?.length < tagLimit) {
      if (!tags.includes(tag) && tag.length) {
        setBlog({ ...blog, tags: [...tags, tag] });
        setHasChanges(true); // Mark as changed
      }
    } else {
      toast.error(`You can add max ${tagLimit} tags`);
    }
    setTagData("");
  };

  return (
    <>
      <div className="flex justify-between items-center sticky top-[84px] md:top-[64px] lg:top-[64px] xl:top-[80px] bg-blue px-3 md:px-10 z-10">
        <p className="text-white font-semibold text-2xl md:text-3xl xl:text-4xl mb-1">
          Preview
        </p>
        <button className="w-12 h-12" onClick={handleClose}>
          <IoMdClose
            size={25}
            className="bg-white rounded-full text-sm text-red pointer-events-none"
          />
        </button>
      </div>
      <section className="w-full grid grid-cols-1 md:grid-cols-5 lg:gap-4 p-5">
        <div className="max-w-[500px] center col-span-1 mt-3 md:col-span-2">
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-grey mt-4">
            <img src={banner} alt="Banner" onError={handleImageError} />
          </div>
          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>
          <p className="line-clamp-3 text-xl leading-7 mt-4">{description}</p>
        </div>

        <div className="border-grey lg:border-1 lg:pl-4 col-span-1 md:col-span-3 h-full md:max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-200px)] xl:max-h-[calc(100vh-200px)] md:overflow-y-auto md:px-3">
          <p className="text-dark-grey mb-2 mt-4 required-text">
            Short description about your news
          </p>
          <textarea
            maxLength={charLength}
            defaultValue={description}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={(e) => {
              setBlog({ ...blog, description: e.target.value });
              setHasChanges(true); // Mark as changed
            }}
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
          <div className="relative input-box pl-2 py-2 pb-4">
            <div className="flex items-center">
              <input
                type="text"
                value={tagdata}
                placeholder="Topics"
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setTagData(e.target.value);
                }}
                className="sticky input-box bg-white top-0 left-0 pl-4 focus:bg-white"
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
          <p className="mt-1 pt-1 mb-4 text-dark-grey text-right">
            {tagLimit - tags?.length} Tags left
          </p>

          <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3">
            <div className="">
              <p className="mb-2 mt-9">Choose the State</p>
              <select
                name="state"
                id="state"
                value={state}
                className="input-box mb-5 pl-4 capitalize"
                onChange={(e) => {
                  setBlog({ ...blog, state: e.target.value });
                  setHasChanges(true); // Mark as changed
                }}
              >
                <option value="" defaultValue={state}>
                  Select State
                </option>
                <option value="rajya">राज्य</option>
                {states.map((state, i) => {
                  return (
                    <option
                      key={i}
                      value={state.english}
                      className="capitalize"
                    >
                      {findHindi(state.english)}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="">
              <p className="mb-2 mt-9">Choose District</p>
              <select
                name="district"
                value={district}
                id="district"
                className="input-box mb-5 pl-4 capitalize"
                onChange={(e) => {
                  setBlog({ ...blog, district: e.target.value });
                  setHasChanges(true); // Mark as changed
                }}
              >
                <option value="" defaultValue={district}>
                  Select District
                </option>
                <option value="apna zila">अपना जिला</option>
                {districts.map((district, i) => {
                  return (
                    <option
                      key={i}
                      value={district.english}
                      className="capitalize"
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
              <p className="mb-2 mt-9 required-text">
                Enter the location of news
              </p>
              <input
                type="text"
                placeholder="News Location"
                value={location}
                className="input-box pl-4"
                onChange={(e) => {
                  setBlog({ ...blog, location: e.target.value });
                  setHasChanges(true); // Mark as changed
                }}
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
              className="input-box mb-5 pl-4 capitalize"
            >
              <option value="">Select News Section</option>
              {CategoryData.map((category, i) => {
                return (
                  <option
                    key={i}
                    value={category.english}
                    className="capitalize"
                  >
                    {category.hindi}
                  </option>
                );
              })}
            </select>

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
    </>
  );
};

export default PublishForm;
