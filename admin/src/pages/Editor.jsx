import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/BlogEditor.jsx";
import axios from "axios";
import Loader from "../components/Loader.jsx";
import PublishForm from "../components/PublishForm.jsx";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  state: "",
  district: "",
  location: "",
  sections: [],
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
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-news", {
        news_id,
        draft: true,
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
  }, []);

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
      {editorState === "editor" ? <BlogEditor /> : <PublishForm />}
    </EditorContext.Provider>
  );
};

export default Editor;
