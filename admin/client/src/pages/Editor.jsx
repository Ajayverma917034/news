import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/BlogEditor.jsx";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import PublishForm from "../components/PublishForm.jsx";
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
  imageRef: "",
  sendNotification: false,
  news_section_type: [],
  breaking_news: false,
  author: { personal_info: {} },
};

export const EditorContext = createContext({});
const Editor = () => {
  let { news_id } = useParams();
  const [blog, setBlog] = useState(blogStructure);
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });

  const [loading, setLoading] = useState(true);
  // console.log(access_token)

  useEffect(() => {
    if (!news_id) {
      return setLoading(false);
    }

    const query = new URLSearchParams(window.location.search);
    const type = query.get("type");

    let fetchUrl = "/";
    if (type === "schedule_news") {
      fetchUrl = "/get-schedule-news";
    } else {
      fetchUrl = "/get-news";
    }
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + fetchUrl, {
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

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {loading ? (
        <Loader />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;
