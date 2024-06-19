import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import lightBanner from "../assets/news banner.png";
import { toast } from "react-hot-toast";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./Tools.jsx";
import axios from "axios";
import { UserContext } from "../App.jsx";
import { EditorContext } from "../pages/Editor.jsx";
import { uploadImage } from "../common/imageUploader.js";

const BlogEditor = ({ blogContent }) => {
  const navigate = useNavigate();
  let { blog_id } = useParams();
  const [contentData, setContentData] = useState(null);

  let {
    blog,
    blog: { title, banner, content, description },
    setBlog,
    textEditor,
    setTextEditor,
    setEditorState,
  } = useContext(EditorContext);

  console.log(content);
  useEffect(() => {
    console.log("hello2");
    console.log(content);
    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holderId: "textEditor",
          data: Array.isArray(content) ? content[0] : content,
          tools: tools,
          placeholder: "Let's write an awesome news",
        })
      );
    }
  }, []);

  const handleChangeBanner = (e) => {
    if (e.target.files[0]) {
      let ladingTast = toast.loading("Uploading...");
      uploadImage(e.target.files[0])
        .then((url) => {
          toast.dismiss(ladingTast);
          toast.success("Uploaded Successfully");

          setBlog({ ...blog, banner: url });
        })
        .catch((err) => {
          toast.dismiss(ladingTast);
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
    setBlog({ ...blog, title: input.value });
  };

  const handleError = (e) => {
    let img = e.target;
    img.src = lightBanner;
  };

  const handlePublishEvent = () => {
    // setEditorState("publish");
    if (!banner.length) {
      return toast.error("Upload a news banner to publish it");
    }
    if (!title.length) return toast.error("Write news title to publis it");
    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
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
            id: blog_id,
          })
          .then(() => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            toast.success("Saved successfully");
            setTimeout(() => {
              navigate("/dashboard/news?tab=draft");
            }, 5000);
          })
          .catch(({ response }) => {
            e.target.classList.remove("disable");
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
          });
      });
    }
  };

  return (
    <>
      <div className="p-5 md:p-10">
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
