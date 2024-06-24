import React, { useState, useEffect } from "react";
import "./EditUser.css";
import { useRef } from "react";
import toast from "react-hot-toast";
import httpClient from "../../services/httpClient";

const EditBreakingNewsHandler = ({ news, setEditBreakingNews }) => {
  const [data, setData] = useState(news);
  //   useEffect(() => {
  //     if (selectedUser) {
  //       setUser(selectedUser);
  //     }
  //   }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = () => {
    const loadingToast = toast.loading("Updating...");
    if (!data.title) {
      return toast.error("Please Enter the Title of the breaking news");
    }

    httpClient
      .put(`admin/update-news/${news._id}`, { ...data })
      .then(({ data }) => {
        if (data.success) {
          toast.dismiss(loadingToast);
          toast.success("Breaking News updated successfully");
          setEditBreakingNews(false);
        } else {
          toast.dismiss(loadingToast);
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        toast.error(err.response.data.error);
      });
  };

  const formRef = useRef();

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setAddNewUser(false);
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
          Update Breaking News
        </h4>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={data.title}
              onChange={handleChange}
              required
            />
          </div>
        </form>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => setAddNewUser(false)}
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

export default EditBreakingNewsHandler;
