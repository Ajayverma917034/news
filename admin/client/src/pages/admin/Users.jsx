// src/components/UserList.js

import React, { useState, useEffect } from "react";
import EditUserForm from "../../components/admin/EditUserForm";
import PasswordResetPopup from "../../components/admin/PasswordResetPopup.jsx";
import "./usercss.css";
import httpClient from "../../services/httpClient";
import toast from "react-hot-toast";
import AddNewUser from "../../components/admin/AddNewUser";

const UserList = () => {
  const [searchText, setSearchText] = useState("");
  const [addNewUser, setAddNewUser] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordResetUser, setPasswordResetUser] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    httpClient
      .post(`admin/get-all-user`)
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
  };

  const handlePasswordResetClick = (user) => {
    setPasswordResetUser(user);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handlePermissionChange = (event) => {
    setSelectedPermission(event.target.value);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.username === updatedUser.username ? updatedUser : user
      )
    );
    setSelectedUser(null);
  };

  const filteredRows = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())) &&
      (selectedPermission === "" || user.role === selectedPermission)
  );

  return (
    <>
      <div className="user-list max-sm:px-2">
        <div className="header">
          <h2>User's List</h2>
          <button
            className="add-user-button max-sm:p-1"
            onClick={() => setAddNewUser(true)}
          >
            + Add New User
          </button>
        </div>
        <div className="search-bar max-sm:hidden">
          <input
            type="text"
            className="search-input max-sm:p-1"
            placeholder="Search user name, email ..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <select
            className="search-select max-sm:p-1"
            value={selectedPermission}
            onChange={handlePermissionChange}
          >
            <option value="">User Permissions</option>
            <option value="admin">Admin</option>
            <option value="reporter">Reporter</option>
          </select>
          <button className="search-button max-sm:p-1">Search</button>
        </div>
      </div>
      <div className="flex-1 p-2 sm:p-6 bg-gray-100">
        <div className="table-container bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">User Role</th>
                <th className="px-4 py-2">Edit</th>
                <th className="px-4 py-2">Edit Password</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((user) => (
                <tr key={user.username}>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.fullName}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="edit-button text-blue-500"
                      onClick={() => handleEditClick(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="edit-password-button text-blue-500"
                      onClick={() => handlePasswordResetClick(user)}
                    >
                      Edit Password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            setSelectedUser={setSelectedUser}
            onUpdateUser={handleUserUpdate}
          />
        )}
        {passwordResetUser && (
          <PasswordResetPopup
            user={passwordResetUser}
            setPasswordResetUser={setPasswordResetUser}
          />
        )}
        {addNewUser && <AddNewUser setAddNewUser={setAddNewUser} />}
      </div>
    </>
  );
};

export default UserList;
