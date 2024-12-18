import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import lightBanner from "../assets/news banner.png";
import { toast } from "react-hot-toast";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./Tools.jsx";
import axios from "axios";
import { EditorContext } from "../pages/Editor.jsx";
import { uploadImage } from "../common/imageUploader.js";
const Todaydate = new Date().toISOString().split("T")[0];
const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  description: "",
  state: [],
  district: [],
  location: "",
  post_time: {
    date: Todaydate,
    time: "",
  },
  news_section_type: [],
  breaking_news: false,
  author: { personal_info: {} },
};

const BlogEditor = ({ blogContent }) => {
  const navigate = useNavigate();
  let { news_id } = useParams();
  const [hasChanges, setHasChanges] = useState(false);

  const query = new URLSearchParams(window.location.search);
  const mode = query.get("mode");
  const type = query.get("type");

  let {
    blog,
    blog: { title, banner, content, description, imageRef },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  useEffect(() => {
    const savedBlog = JSON.parse(localStorage.getItem("blog"));
    if (savedBlog) {
      setBlog(savedBlog);
    }

    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holderId: "textEditor",
          data: savedBlog
            ? savedBlog.content
            : Array.isArray(content)
            ? content[0]
            : content,
          tools: tools,
          placeholder: "Let's write an awesome news",
          onChange: () => setHasChanges(true),
        })
      );
    }
  }, []);

  useEffect(() => {
    const autoSave = () => {
      if (textEditor.isReady && hasChanges) {
        textEditor.save().then((data) => {
          const updatedBlog = { ...blog, content: data };
          setBlog(updatedBlog);
          localStorage.setItem("blog", JSON.stringify(updatedBlog));

          // Send auto-save request to server
          // axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
          //   ...updatedBlog,
          //   id: news_id,
          //   draft: true,
          // });

          // Reset hasChanges to false after saving
          setHasChanges(false);
        });
      }
    };

    const intervalId = setInterval(autoSave, 5000);

    return () => clearInterval(intervalId);
  }, [textEditor, blog, news_id, setBlog, hasChanges]);

  const handleChangeBanner = (e) => {
    if (e.target.files[0]) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(e.target.files[0])
        .then((url) => {
          toast.dismiss(loadingToast);
          toast.success("Uploaded Successfully");

          const updatedBlog = { ...blog, banner: url };
          setBlog(updatedBlog);
          localStorage.setItem("blog", JSON.stringify(updatedBlog));
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
    localStorage.setItem("blog", JSON.stringify(updatedBlog));
    setHasChanges(true);
  };
  const handleImageCaptionChange = (e) => {
    let input = e.target;
    const updatedBlog = { ...blog, imageRef: input.value };
    setBlog(updatedBlog);
    localStorage.setItem("blog", JSON.stringify(updatedBlog));
    setHasChanges(true);
  };

  const handleError = (e) => {
    let img = e.target;
    img.src = lightBanner;
  };

  const handlePublishEvent = () => {
    if (!banner.length) {
      return toast.error("Upload a news banner to publish it");
    }
    if (!title.length) return toast.error("Write news title to publish it");
    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            const updatedBlog = { ...blog, content: data };
            setBlog(updatedBlog);
            setEditorState("publish");
            localStorage.setItem("blog", JSON.stringify(updatedBlog));
          } else {
            return toast.error("Write Something in your news to publish it");
          }
        })
        .catch((err) => {
          toast.error(err);
        });
    }
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

    if (textEditor && textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title,
          banner,
          description,
          content,
          draft: true,
        };
        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/create-news", {
            ...blogObj,
            id: news_id,
          })
          .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Saved successfully");
            localStorage.removeItem("blog");
            navigate("/dashboard");
          })
          .catch(({ response }) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
          });
      });
    }
  };

  const handleResetEditor = (e) => {
    e.preventDefault();
    localStorage.removeItem("blog");
    setBlog(blogStructure);
    setHasChanges(false);
    setEditorState("editor");
    navigate("/dashboard");
  };
  return (
    <>
      <div className="p-5 md:p-10 h-[calc(100vh-100px)] md:h-[calc(100vh-82px)] overflow-auto">
        <nav className="flex px-3 mb-4">
          <p className="max-md:hidden text-black line-clamp-1 w-full text-4xl font-medium leading-7 sm:line-clamp-2 ">
            {title?.length ? title : "New News"}
          </p>
          <div className="flex gap-4 ml-auto">
            <button className="btn-dark py-1" onClick={handlePublishEvent}>
              Publish
            </button>
            <button
              className="btn-light py-1 bg-red text-white"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>
            {mode !== "edit" && (
              <button
                className="btn-light py-1 bg-red text-white"
                onClick={handleResetEditor}
              >
                Reset Editor
              </button>
            )}
          </div>
        </nav>
        <section>
          <div className="mx-auto max-w-[700px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-2 border-blue rounded-md">
              <label htmlFor="uploadBanner">
                <img
                  src={banner}
                  alt="Default Banner"
                  className="z-20 rounded-md"
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
            <div className="flex w-full flex-col mt-2">
              <p>Image Caption</p>
              <input
                className="text-md font-medium w-full  outline-none  mt-1 leading-tight placeholder:opacity-40 bg-white border rounded-md px-1 py-1"
                type="text"
                onChange={handleImageCaptionChange}
                value={imageRef}
                placeholder="Image Caption"
              />
            </div>
            <textarea
              defaultValue={title}
              placeholder="News Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-5 leading-tight placeholder:opacity-40 bg-white"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-anekdevanagari"></div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogEditor;
