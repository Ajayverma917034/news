// src/components/UserForm.js

import React, { useState, useEffect } from "react";
import "./EditUser.css";

const EditUserForm = ({ user: selectedUser, setSelectedUser }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    permissions: "",
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

  const handleSwitchChange = (e) => {
    setUser({ ...user, status: e.target.checked });
  };

  const handleSave = () => {
    onSave(user);
  };

  return (
    <div className="user-form">
      <div className="form-group">
        <label htmlFor="name">
          Username <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
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
        <label htmlFor="email">
          Password <span className="required">*</span>
        </label>
        <input
          type="email"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="permissions">
          User Permissions <span className="required">*</span>
        </label>
        <select
          id="permissions"
          name="permissions"
          value={user.permissions}
          onChange={handleChange}
          required
        >
          <option value="Operational">Operational</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="status">
          Status <span className="required">*</span>
        </label>
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
