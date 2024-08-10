// src/components/admin/EditUserForm.js

import React, { useState, useEffect } from "react";
import "./EditUser.css";
import httpClient from "../../services/httpClient";
import toast from "react-hot-toast";

const EditUserForm = ({
  user: selectedUser,
  setSelectedUser,
  onUpdateUser,
}) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "reporter",
  });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [selectedUser]);

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

    httpClient
      .put("admin/update-user", { ...user })
      .then(({ data }) => {
        if (data.success) {
          toast.success("User Updated successfully");
          onUpdateUser(user); // Update the user in the parent state
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="user-form">
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
        <label htmlFor="role">
          User Permissions <span className="required">*</span>
        </label>
        <select
          id="role"
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="reporter">Reporter</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={() => setSelectedUser(null)}
        >
          Cancel
        </button>
        <button type="button" className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditUserForm;
