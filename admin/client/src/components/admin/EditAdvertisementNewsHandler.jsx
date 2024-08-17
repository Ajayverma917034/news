import React, { useState, useEffect } from "react";
import "./EditUser.css";
import { useRef } from "react";
import toast from "react-hot-toast";
import httpClient from "../../services/httpClient";

const EditAdvertisementNewsHandler = ({ news, setEditBreakingNews }) => {
  const [data, setData] = useState(news);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = () => {
    const loadingToast = toast.loading("Updating...");
    if (!data.title) {
      return toast.error("Please Enter the Title of the breaking news");
    }

    if (!data.expireDate) {
      return toast.error("Please Enter the Expire Date of the breaking news");
    }
    httpClient
      .put(`update-title-advetisement/${news._id}`, { ...data })
      .then(({ data }) => {
        toast.dismiss(loadingToast);
        toast.success("Breaking News updated successfully");
        setEditBreakingNews(false);
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        toast.error(err.response.data.error);
      });
  };

  const formRef = useRef();

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setEditBreakingNews(false);
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
          Update Advertisement News
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
              value={data.title}
              className="w-full border rounded-md resize-none border-blue p-2"
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="link">
              Link <span className=""></span>
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={data.link}
              className="w-full border rounded-md resize-none border-blue p-2"
              onChange={handleChange}
              required
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
              value={data.email}
              className="w-full border rounded-md resize-none border-blue p-2"
              onChange={handleChange}
            />
          </div>
        </form>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setEditBreakingNews(false)}
          >
            Cancel
          </button>
          <button type="button" className="save-button" onClick={handleSave}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAdvertisementNewsHandler;
