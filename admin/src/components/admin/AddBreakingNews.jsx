import React, { useState, useEffect } from "react";
import "./EditUser.css";
import { useRef } from "react";
import toast from "react-hot-toast";
import httpClient from "../../services/httpClient";

const AddBreakingNews = ({ setAddBreakingNews }) => {
  const [news, setNews] = useState({
    title: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSave = () => {
    if (!news.title) {
      return toast.error("Please Enter the title of news");
    }

    httpClient
      .post("admin/create-breaking-news", { ...news })
      .then(({ data }) => {
        if (data.success) {
          toast.success("News added successfully");
          setAddBreakingNews(false);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  const formRef = useRef();

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setAddBreakingNews(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="overlay">
      <div className="user-form" ref={formRef}>
        <h4 className="text-3xl text-center font-bold text-blue">
          Add Breaking News
        </h4>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="title">
              Title <span className="required">*</span>
            </label>
            <textarea
              type="text"
              id="title"
              name="title"
              value={news.title}
              className="w-full border rounded-md resize-none border-blue p-2"
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
        </form>
       
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setAddBreakingNews(false)}
          >
            Cancel
          </button>
          <button type="button" className="save-button" onClick={handleSave}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBreakingNews;
