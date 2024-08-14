import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import lightBanner from "../assets/news banner.png";
import { uploadImage } from "../common/imageUploader.js";
import toast from "react-hot-toast";
const blogStructure = {
  title: "",
  banner: "",
  desription: "",
};

let charLength = 200;

const CreateEventNews = () => {
  let { news_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [hasChanges, setHasChanges] = useState(false);

  const [loading, setLoading] = useState(true);

  const { title, banner, description } = blog;

  const navigate = useNavigate();

  const handlePublishEvent = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!banner.length) {
      return toast.error("Upload a news banner to publish it");
    }
    if (!title.length) return toast.error("Write news title to publish it");

    let blogObj = {
      title,
      banner,
      description,
    };
    e.target.classList.add("disable");
    let loadingToast = toast.loading("Publishing Event News...");
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-event-news", {
        ...blogObj,
        id: news_id,
        draft: false,
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Published successfully");
        localStorage.removeItem("event-blog");
        navigate("/dashboard/all-event-news");
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        return toast.error(response?.data?.error);
      });
  };

  const handleSaveDraft = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }
    if (!title.length) {
      return toast.error("Write News Title before saving it as draft");
    }

    let loadingToast = toast.loading("Saving Draft...");
    e.target.classList.add("disable");
    let blogObj = {
      title,
      banner,
      description,
      draft: true,
    };

    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-event-news", {
        ...blogObj,
        id: news_id,
      })
      .then(() => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        toast.success("Saved successfully");
        localStorage.removeItem("event-blog");
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        return toast.error(response.data.error);
      });
  };

  const handleError = (e) => {
    let img = e.target;
    img.src = lightBanner;
  };

  const handleChangeBanner = (e) => {
    if (e.target.files[0]) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(e.target.files[0])
        .then((url) => {
          toast.dismiss(loadingToast);
          toast.success("Uploaded Successfully");

          const updatedBlog = { ...blog, banner: url };
          setBlog(updatedBlog);
          localStorage.setItem("event-blog", JSON.stringify(updatedBlog));
          setHasChanges(true);
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          toast.error(err);
        });
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) e.preventDefault();
  };

  const handleTitleChange = (e) => {
    let input = e.target;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    const updatedBlog = { ...blog, title: input.value };
    setBlog(updatedBlog);
    localStorage.setItem("event-blog", JSON.stringify(updatedBlog));
    setHasChanges(true);
  };
  const handleChangeDescription = (e) => {
    const updatedBlog = { ...blog, description: e.target.value };
    setBlog(updatedBlog);
    localStorage.setItem("event-blog", JSON.stringify(updatedBlog));
    setHasChanges(true);
  };

  useEffect(() => {
    if (!news_id) {
      return setLoading(false);
    }
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-event-news", {
        news_id,
        mode: "edit",
      })
      .then(({ data: { news } }) => {
        setBlog(news);
        setLoading(false);
      })
      .catch((err) => {
        setBlog(null);
        setLoading(false);
        console.log(err);
      });
  }, [news_id]);

  useEffect(() => {
    const savedBlog = JSON.parse(localStorage.getItem("event-blog"));
    if (savedBlog) {
      setBlog(savedBlog);
    }
  }, []);
  return (
    <div className="p-5 md:p-10 h-[calc(100vh-100px)] md:h-[calc(100vh-82px)] overflow-auto">
      <nav className="flex px-3 mb-4">
        <p className="max-md:hidden text-black line-clamp-1 w-full text-4xl font-medium leading-7 sm:line-clamp-2 ">
          {title?.length ? title : "Event News Title"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-1" onClick={handlePublishEvent}>
            Publish
          </button>
          {/* <button
            className="btn-light py-1 bg-red text-white"
            onClick={handleSaveDraft}
          >
            Save Draft
          </button> */}
        </div>
      </nav>
      <section>
        <div className="mx-auto max-w-[800px] max-h-[00px] w-full">
          <div className="relative  hover:opacity-80 bg-white border-2 border-blue rounded-md">
            <label htmlFor="uploadBanner">
              <img
                src={banner}
                alt="Default Banner"
                className="z-20 rounded-md max-h-[800px] object-contain"
                onError={handleError}
              />
              <input
                type="file"
                id="uploadBanner"
                accept=".png, .jpg, .jpeg, .webp"
                hidden
                onChange={handleChangeBanner}
              />
            </label>
          </div>

          <textarea
            defaultValue={title}
            placeholder="News Title"
            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-5 leading-tight placeholder:opacity-40 bg-white"
            onKeyDown={handleTitleKeyDown}
            onChange={handleTitleChange}
          ></textarea>
          <hr className="w-full opacity-10 my-5" />
          <label className="text-3xl text-black font-medium">Description</label>
          <textarea
            maxLength={charLength}
            defaultValue={description}
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleChangeDescription}
            onKeyDown={(e) => {
              if (e.keyCode === 13) e.preventDefault();
            }}
          ></textarea>
        </div>
      </section>
    </div>
  );
};

export default CreateEventNews;
