import React, { useState, useEffect } from "react";
import "./EditUser.css";
import { useRef } from "react";
import toast from "react-hot-toast";
import httpClient from "../../services/httpClient";

const AddNewUser = ({ setAddNewUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "reporter",
  });

  //   useEffect(() => {
  //     if (selectedUser) {
  //       setUser(selectedUser);
  //     }
  //   }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    if (!user.username) {
      return toast.error("Please Enter the username");
    }
    if (!user.email) {
      return toast.error("Please enter the email");
    }
    if (!user.password) {
      return toast.error("Please enter the password");
    }
    httpClient
      .post("admin/add-user", { ...user })
      .then(({ data }) => {
        if (data.success) {
          toast.success("User added successfully");
          setAddNewUser(false);
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
        <h4 className="text-3xl text-center font-bold text-blue">Add User</h4>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">
              User Permissions <span className="required">*</span>
            </label>
            <select
              id="role"
              name="role"
              value={user.permissions}
              onChange={handleChange}
              required
            >
              <option value="reporter">Reporter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </form>
        {/* <div className="form-group">
        <label htmlFor="status">Status <span className="required">*</span></label>
        <div className="switch-group">
          <label className="switch">
            <input
              type="checkbox"
              id="status"
              name="status"
              checked={user.status}
              onChange={handleSwitchChange}
            />
            <span className="slider"></span>
          </label>
          <span className="switch-label">Inactive</span>
        </div>
      </div> */}
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

export default AddNewUser;
