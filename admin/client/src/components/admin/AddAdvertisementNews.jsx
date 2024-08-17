import React, { useState, useEffect, useRef } from "react";
import "./EditUser.css";
import toast from "react-hot-toast";
import httpClient from "../../services/httpClient";

const AddAdvertisementNews = ({ setAddBreakingNews }) => {
  // Calculate date 7 days from today
  const calculateExpireDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const [news, setNews] = useState({
    title: "",
    link: "",
    email: "",
    expireDate: calculateExpireDate(), // Set initial value to 7 days from today
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews({ ...news, [name]: value });
  };

  const handleSave = () => {
    if (!news.title) {
      return toast.error("Please Enter the title of news");
    }
    if (!news.expireDate) {
      return toast.error("Please make sure about the expire Date");
    }

    httpClient
      .post("admin/ads-title/add", { ...news })
      .then(({ data }) => {
        if (data.success) {
          toast.success("Advertisement added successfully");
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
          Add Advertisement News
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
          <div className="form-group">
            <label htmlFor="link">
              Link (if available) <span className=""></span>
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={news.link}
              className="w-full border rounded-md resize-none border-blue p-2"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span className=""></span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={news.email}
              className="w-full border rounded-md resize-none border-blue p-2"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="expireDate">
              Expire Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="expireDate"
              readOnly
              name="expireDate"
              value={news.expireDate}
              className="w-full border rounded-md resize-none border-blue p-2"
              onChange={handleChange}
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

export default AddAdvertisementNews;
